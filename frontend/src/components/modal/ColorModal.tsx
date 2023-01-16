import React, { FC, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { Modal } from "antd";
import ColorCubic from "../utils/ColorCubic";
import color from "../../styles/abstract/variables.module.scss";
import { changeColor } from "../../redux/actions/auth";

interface Props {
  isVisible: boolean;
  close: any;
}

const ColorModal: FC<Props> = ({ isVisible, close }) => {
  const dispatch = useDispatch();
  const [chosen, setChosen] = useState<number>(0);
  const colorArray = [color.light_green, color.normal_green, color.light_orange, color.normal_orange, color.light_red, color.normal_red, color.light_purple, color.normal_purple, color.light_blue, color.normal_blue, color.light_purple_2, color.normal_purple_2, color.light_koamaru, color.normal_koamaru, color.light_grey, color.normal_grey, color.normal_silver_2, color.normal_silver];

  const colorCubicStateHandler = (item: any, index: number) => {
    setChosen(index);
    dispatch(changeColor(item));
  };

  return (
    <Modal width="500px" style={{ padding: "25px 0" }} visible={isVisible} onCancel={() => close(false)} footer={null}>
      <div style={{ fontSize: "30px", marginBottom: "15px" }}>Pick a color</div>
      <div className="icon-colorbox" style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
        {colorArray.map((item, index) => (
          <div className={chosen === index ? "active-color-box" : "color-box"} onClick={() => colorCubicStateHandler(item, index)} style={{ backgroundColor: item, width: "50px", height: "50px" }}></div>
        ))}
      </div>
    </Modal>
  );
};

export default ColorModal;
