import { useEffect, useState } from "react";
import { Row, Col, message, Avatar } from "antd";
import BoxProfilePicture from "../../../components/ui/BoxProfilePicture";
import BoxProfileInfo from "../../../components/ui/BoxProfileInfo";
import { useAuthContext } from "../../../hooks/useAuthContext";
import {
  getOneUser,
  updateUser,
  updatePassword,
} from "../../../services/userApiService";

const Profile = () => {
  const { user } = useAuthContext();
  const [messageApi, contextHolder] = message.useMessage();
  const [profile, setProfile] = useState("");

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    const res = await getOneUser(user._id, user.token);
    setProfile(res);
  };

  const handleChangePassword = async (data) => {
    const res = await updatePassword(user._id, data, user.token);
    if (res.status !== 200) {
      messageApi.open({
        type: "error",
        content: "Mật khẩu chưa chính xác",
      });
    }
    if (res.status === 200) {
      messageApi.open({
        type: "success",
        content: "Cập nhật thành công",
      });
      fetchUser();
    }
    return res;
  };

  const handleUpdate = async (data) => {
    const res = await updateUser(user._id, data, user.token);
    if (res.status !== 200) {
      messageApi.open({
        type: "error",
        content: res.message,
      });
    }
    if (res.status === 200) {
      messageApi.open({
        type: "success",
        content: "Cập nhật thành công",
      });
      fetchUser();
    }
  };

  return (
    <Row
      gutter={{
        xs: 8,
        sm: 16,
        md: 24,
        lg: 32,
      }}
    >
      {contextHolder}
      <Col span={6}>
        <div
          style={{
            boxShadow:
              "rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px",
          }}
        >
          <h2
            style={{
              color: "#FFFFFF",
              padding: "8px 0px",
              margin: 0,
              textAlign: "center",
              background: "#95D354",
            }}
          >
            Ảnh hồ sơ
          </h2>
          <div style={{ height: 320, textAlign: "center" }}>
            <Avatar
              src="https://upload.wikimedia.org/wikipedia/commons/0/03/Logo_HAU.png"
              style={{ width: 240, height: 240, marginTop: 30 }}
            />
          </div>
          {/* <BoxProfilePicture /> */}
        </div>
      </Col>
      <Col span={18}>
        <div
          style={{
            boxShadow:
              "rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px",
          }}
        >
          <h2
            style={{
              color: "#FFFFFF",
              padding: "8px 0px",
              margin: 0,
              textAlign: "center",
              background: "#95D354",
            }}
          >
            Thông tin tài khoản
          </h2>
          <BoxProfileInfo
            info={profile}
            handleUpdate={handleUpdate}
            handleChangePassword={handleChangePassword}
          />
        </div>
      </Col>
    </Row>
  );
};

export default Profile;
