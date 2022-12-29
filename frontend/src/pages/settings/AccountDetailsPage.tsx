import React, { useState, FC, ChangeEvent } from "react";
import { Divider, Input, Avatar } from "antd";
import { useDispatch, useSelector, RootStateOrAny } from "react-redux";
import { changeFirstname, changeLastname } from "../../redux/actions/auth";
import AvatarIcon from "../../components/utils/AvatarIcon";
import ColorModal from "../../components/modal/ColorModal";
import color from "../../styles/abstract/variables.module.scss";

interface Props {
  profile: any;
}

const AccountDetailsPage: FC<Props> = ({ profile }) => {
  const dispatch = useDispatch();
  const [firstname, setFirstname] = useState(profile.firstname);
  const [lastname, setLastname] = useState(profile.lastname);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const user = useSelector((state: RootStateOrAny) => state.auth.user);

  const firstnameHandler = () => {
    if (firstname !== profile.firstname) {
      dispatch(changeFirstname({ firstname: firstname }));
    }
  };

  const lastnameHandler = () => {
    if (firstname !== profile.lastname) {
      dispatch(changeLastname({ lastname: lastname }));
    }
  };

  const modalHandler = (val: boolean) => {
    setIsModalVisible(val);
  };

  return (
    <div style={{ marginTop: "10px" }}>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <span style={{ fontWeight: "bolder" }}>Personal info</span>
        <span>Update your personal information here</span>
      </div>
      <Divider />
      <div style={{ width: "60%" }}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <div style={{ flex: "2", fontWeight: "bolder" }}>Avatar</div>
          <div onClick={() => setIsModalVisible(true)} style={{ display: "flex", flexDirection: "row", flex: "1" }}>
            <Avatar style={{ backgroundColor: user.color === null || user.color.length < 1 ? color.normal_orange : user.color, width: "100px", height: "100px", display: "flex", justifyContent: "center", alignItems: "center", cursor: "pointer" }}>
              <AvatarIcon firstname={firstname} lastname={lastname} size={50} />
            </Avatar>
          </div>
        </div>
      </div>
      <Divider />
      <div style={{ width: "60%" }}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <div style={{ flex: "2", fontWeight: "bolder" }}>Name</div>
          <div style={{ display: "flex", flexDirection: "row", flex: "1" }}>
            <Input style={{ marginRight: "10px", width: "200px" }} value={firstname} onChange={(e: ChangeEvent<HTMLInputElement>) => setFirstname(e.target.value)} onBlur={firstnameHandler} placeholder="firstname" />
            <Input style={{ width: "200px" }} type="text" value={lastname} onChange={(e: ChangeEvent<HTMLInputElement>) => setLastname(e.target.value)} onBlur={lastnameHandler} placeholder="lastname" />
          </div>
        </div>
      </div>
      <Divider />
      <div style={{ width: "60%" }}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <div style={{ flex: "2", fontWeight: "bolder" }}>Bio</div>
          <div style={{ flex: "1" }}>
            <Input.TextArea rows={4} style={{ width: "410px" }} />
          </div>
        </div>
      </div>
      <ColorModal isVisible={isModalVisible} close={modalHandler} />
    </div>
  );
};

export default AccountDetailsPage;
