import { useEffect, useState } from "react";
import {
    getProfile,
    updateProfile,
    changePassword
} from "../../services/profileService";
import "./Profile.css";

function Profile() {

    const [profile, setProfile] = useState(null);
    const [fullName, setFullName] = useState("");

    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        let active = true;

        const fetchProfile = async () => {

            try {

                const data = await getProfile();

                if (!active) return;

                setProfile(data);
                setFullName(data.fullName);

            } catch (error) {

                console.error(error);

            } finally {

                if (active) {
                    setLoading(false);
                }

            }

        };

        fetchProfile();

        return () => {
            active = false;
        };

    }, []);

    const handleProfileUpdate = async () => {

        try {

            const updated = await updateProfile(fullName);

            setProfile(updated);

            alert("Profile updated successfully.");

        } catch (error) {

            console.error(error);

            alert("Unable to update profile.");

        }

    };

    const handlePasswordChange = async () => {

        if (!currentPassword || !newPassword) {

            alert("Please enter both passwords.");

            return;

        }

        try {
            const message = await changePassword(currentPassword, newPassword);

            alert(message);

            setCurrentPassword("");
            setNewPassword("");
        } catch (error) {

            console.error(error);

            alert(
                error.response?.data?.message ||
                "Password change failed."
            );

        }

    };

    if (loading) {

        return (
            <div className="profile-container">
                <h3>Loading...</h3>
            </div>
        );

    }

    return (

        <div className="container profile-container">

            <div className="card shadow profile-card">

                <div className="card-body">

                    <h2 className="mb-4">
                        My Profile
                    </h2>

                    <div className="mb-3">

                        <label className="form-label">

                            Full Name

                        </label>

                        <input
                            className="form-control"
                            value={fullName}
                            onChange={(e) =>
                                setFullName(e.target.value)
                            }
                        />

                    </div>

                    <div className="mb-3">

                        <label className="form-label">

                            Email

                        </label>

                        <input
                            className="form-control"
                            value={profile.email}
                            disabled
                        />

                    </div>

                    <div className="mb-3">

                        <label className="form-label">

                            Role

                        </label>

                        <input
                            className="form-control"
                            value={profile.role}
                            disabled
                        />

                    </div>

                    <div className="mb-4">

                        <label className="form-label">

                            Joined On

                        </label>

                        <input
                            className="form-control"
                            value={new Date(profile.createdAt)
                                .toLocaleString()}
                            disabled
                        />

                    </div>

                    <button
                        className="btn btn-primary"
                        onClick={handleProfileUpdate}
                    >

                        Save Profile

                    </button>

                    <hr className="my-5"/>

                    <h4>

                        Change Password

                    </h4>

                    <div className="mb-3">

                        <input
                            type="password"
                            className="form-control"
                            placeholder="Current Password"
                            value={currentPassword}
                            onChange={(e) =>
                                setCurrentPassword(e.target.value)
                            }
                        />

                    </div>

                    <div className="mb-3">

                        <input
                            type="password"
                            className="form-control"
                            placeholder="New Password"
                            value={newPassword}
                            onChange={(e) =>
                                setNewPassword(e.target.value)
                            }
                        />

                    </div>

                    <button
                        className="btn btn-success"
                        onClick={handlePasswordChange}
                    >

                        Change Password

                    </button>

                </div>

            </div>

        </div>

    );

}

export default Profile;