import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import "./EditUserInformation.scss";
import { useAppDispatch } from "../../hooks/hooks";
import { updateProfile } from "../../features/user/userSlice";
import axios from "axios";
import { toast } from "react-toastify";
import { id } from "date-fns/locale";

const EditUserInformation: React.FC = () => {
    const user = useSelector((state: RootState) => state.user.user);
    const dispatch = useAppDispatch();

    const [userData, setUserData] = useState({
        userName: user?.userName || "",
        userEmail: user?.userEmail || "",
        userPhone: user?.userPhone || "",
    });

    const [originalData, setOriginalData] = useState(userData);
    const [editable, setEditable] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUserData((prev) => ({ ...prev, [name]: value }));
    };

    const handleEdit = () => {
        setEditable(true);

    };
     const handleCancel = () => {
        setUserData(originalData);
        setEditable(false);
    };
    const handleSave = async () => {
        try {
            const response = await axios.post('http://localhost:8080/users/EditUser', {
                newName: userData.userName,
                newEmail: userData.userEmail,
                newPhone: userData.userPhone,
                id: user?.id,
            });

            dispatch(updateProfile({
                userName: userData.userName,
                userEmail: userData.userEmail,
                userPhone: userData.userPhone,
            }));

            toast.success('השינוי בוצע בהצלחה!');
            setOriginalData(userData);
            setEditable(false);
        } catch (error: any) {
            if (axios.isAxiosError(error)) {
                const errorMsg = error.response?.data;
                const message = typeof errorMsg === 'string'
                    ? errorMsg
                    : errorMsg?.message || 'שגיאה בשינוי';
                console.error('שגיאה:', message);
                toast.error(message);
            }
        }
    };

return (
    <div className="edit-user-container">
        <div className="field-group">
            <label>שם משתמש:</label>
            <input
                name="userName"
                value={userData.userName}
                onChange={handleChange}
                readOnly={!editable}
            />
        </div>

        <div className="field-group">
            <label>אימייל:</label>
            <input
                name="userEmail"
                value={userData.userEmail}
                onChange={handleChange}
                readOnly={!editable}
            />
        </div>

        <div className="field-group">
            <label>טלפון:</label>
            <input
                name="userPhone"
                value={userData.userPhone}
                onChange={handleChange}
                readOnly={!editable}
            />
        </div>

        <div className="button-group">
            {!editable ? (
                <button onClick={handleEdit} className="edit-btn">
                    ערוך
                </button>
            ) : (
                <>
                    <button onClick={handleSave} className="save-btn">
                        שמור
                    </button>
                    <button onClick={handleCancel} className="cancel-btn">
                        בטל
                    </button>
                </>
            )}
        </div>
    </div>
)
};

export default EditUserInformation;
