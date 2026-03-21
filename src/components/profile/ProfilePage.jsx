import { useEffect, useMemo, useState } from "react";
import { Navigate } from "react-router-dom";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import { useUserStore } from "../../context/zustand.jsx";
import { supabase } from "../../context/supabase";
import defaultProfileImage from "../../assets/profile.png";
import "./ProfilePage.css";

const AVATAR_BUCKET = "avatars";
const MAX_FILE_SIZE = 3 * 1024 * 1024;

function getDisplayName(user, profile) {
    return (
        profile?.full_name ||
        profile?.name ||
        user?.user_metadata?.full_name ||
        user?.user_metadata?.name ||
        user?.email?.split("@")[0] ||
        "User"
    );
}

export default function ProfilePage() {
    const { user, profile, refreshProfile, updateProfileLocally } = useUserStore();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const [form, setForm] = useState({
        full_name: "",
        phone: "",
        city: "",
        address: ""
    });

    useEffect(() => {
        let mounted = true;
        const load = async () => {
            setLoading(true);
            await refreshProfile();
            if (mounted) setLoading(false);
        };
        load();
        return () => {
            mounted = false;
        };
    }, [refreshProfile]);

    useEffect(() => {
        if (!user) return;
        setForm({
            full_name: getDisplayName(user, profile),
            phone: profile?.phone || user?.user_metadata?.phone || "",
            city: profile?.city || user?.user_metadata?.city || "",
            address: profile?.address || user?.user_metadata?.address || ""
        });
    }, [user, profile]);

    const avatarUrl = useMemo(() => {
        return profile?.avatar_url || user?.user_metadata?.avatar_url || defaultProfileImage;
    }, [profile, user]);

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSave = async (e) => {
        e.preventDefault();
        setSaving(true);
        setError("");
        setSuccess("");

        try {
            const { error: authError } = await supabase.auth.updateUser({
                data: {
                    ...(user.user_metadata || {}),
                    full_name: form.full_name,
                    phone: form.phone,
                    city: form.city,
                    address: form.address
                }
            });

            if (authError) throw authError;

            const { error: profileError } = await supabase
                .from("profiles")
                .upsert(
                    {
                        id: user.id,
                        email: user.email,
                        full_name: form.full_name,
                        updated_at: new Date().toISOString()
                    },
                    { onConflict: "id" }
                );

            if (profileError) throw profileError;

            updateProfileLocally({
                full_name: form.full_name,
                phone: form.phone,
                city: form.city,
                address: form.address,
                email: user.email
            });

            setSuccess("Profile updated successfully.");
        } catch (err) {
            setError(err.message || "Failed to update profile.");
        } finally {
            setSaving(false);
        }
    };

    const handleAvatarUpload = async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (!file.type.startsWith("image/")) {
            setError("Please choose an image file.");
            return;
        }

        if (file.size > MAX_FILE_SIZE) {
            setError("Image size must be 3MB or less.");
            return;
        }

        setUploading(true);
        setError("");
        setSuccess("");

        try {
            const ext = file.name.split(".").pop();
            const path = `${user.id}/avatar-${Date.now()}.${ext}`;

            const { error: uploadError } = await supabase.storage
                .from(AVATAR_BUCKET)
                .upload(path, file, { upsert: true });

            if (uploadError) throw uploadError;

            const { data: publicData } = supabase.storage
                .from(AVATAR_BUCKET)
                .getPublicUrl(path);

            const publicUrl = publicData?.publicUrl;
            if (!publicUrl) throw new Error("Could not get uploaded image URL.");

            const { error: updateAuthError } = await supabase.auth.updateUser({
                data: {
                    ...(user.user_metadata || {}),
                    avatar_url: publicUrl
                }
            });
            if (updateAuthError) throw updateAuthError;

            const { error: profileError } = await supabase
                .from("profiles")
                .upsert(
                    {
                        id: user.id,
                        email: user.email,
                        full_name: form.full_name || getDisplayName(user, profile),
                        avatar_url: publicUrl,
                        updated_at: new Date().toISOString()
                    },
                    { onConflict: "id" }
                );
            if (profileError) throw profileError;

            updateProfileLocally({ avatar_url: publicUrl });
            setSuccess("Profile picture updated.");
        } catch (err) {
            setError(
                err.message ||
                "Upload failed. Make sure Supabase Storage bucket 'avatars' exists and is public."
            );
        } finally {
            setUploading(false);
            e.target.value = "";
        }
    };

    return (
        <>
            <Header />
            <main className="profile-page">
                <section className="profile-card">
                    <div className="profile-title-row">
                        <h1>My Profile</h1>
                        <p>Manage your account information and profile picture.</p>
                    </div>

                    {loading ? (
                        <div className="profile-message">Loading profile...</div>
                    ) : (
                        <>
                            {error && <div className="profile-alert error">{error}</div>}
                            {success && <div className="profile-alert success">{success}</div>}

                            <div className="avatar-row">
                                <img src={avatarUrl} alt="Profile avatar" className="avatar-image" />
                                <div className="avatar-actions">
                                    <label className="upload-btn">
                                        {uploading ? "Uploading..." : "Upload Profile Picture"}
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleAvatarUpload}
                                            disabled={uploading}
                                        />
                                    </label>
                                    <small>PNG/JPG/WEBP, max 3MB</small>
                                </div>
                            </div>

                            <form className="profile-form" onSubmit={handleSave}>
                                <label>
                                    Full Name
                                    <input
                                        type="text"
                                        name="full_name"
                                        value={form.full_name}
                                        onChange={handleChange}
                                        required
                                    />
                                </label>

                                <label>
                                    Email
                                    <input type="email" value={user.email || ""} disabled />
                                </label>

                                <label>
                                    Phone
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={form.phone}
                                        onChange={handleChange}
                                        placeholder="e.g. +212600000000"
                                    />
                                </label>

                                <label>
                                    City
                                    <input
                                        type="text"
                                        name="city"
                                        value={form.city}
                                        onChange={handleChange}
                                        placeholder="Your city"
                                    />
                                </label>

                                <label className="full-width">
                                    Address
                                    <textarea
                                        name="address"
                                        value={form.address}
                                        onChange={handleChange}
                                        placeholder="Your delivery address"
                                        rows={3}
                                    />
                                </label>

                                <button type="submit" disabled={saving}>
                                    {saving ? "Saving..." : "Save Changes"}
                                </button>
                            </form>
                        </>
                    )}
                </section>
            </main>
            <Footer />
        </>
    );
}
