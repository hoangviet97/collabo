import React, { useState, useEffect, FC } from "react";
import { Popover, Modal, Form, Input, Menu, Button, Radio, Select } from "antd";
import { CommentOutlined, TagsOutlined, CalendarOutlined, InfoCircleOutlined, PieChartOutlined, DollarOutlined, FundOutlined, FileTextOutlined, DashboardOutlined, TeamOutlined, FundProjectionScreenOutlined, EyeOutlined, BarsOutlined, LayoutOutlined, ProjectOutlined, EllipsisOutlined } from "@ant-design/icons";
import { Link, withRouter } from "react-router-dom";
import { useDispatch, useSelector, RootStateOrAny } from "react-redux";
import { updateColor, updateStatus, deleteProject, setCurrency, changeName } from "../../actions/project";
import AvatarIcon from "../utils/AvatarIcon";
import { colorList } from "../utils/Colors";

interface Props {
  history: any;
}

const ProjectNavigation: FC<Props> = ({ history }) => {
  let path = window.location.pathname;
  const user_role = useSelector((state: RootStateOrAny) => state.project.currentProject.role);

  const { push } = history;

  const { TextArea } = Input;
  const { Option } = Select;
  const dispatch = useDispatch();
  const currentProject = useSelector((state: RootStateOrAny) => state.project.currentProject);
  const auth = useSelector((state: RootStateOrAny) => state.project.authorized);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [projectName, setProjectName] = useState<string>("");
  const [showIconTab, setIconTab] = useState<boolean>(false);
  const [projectDescription, setProjectDescription] = useState<string>("");
  const [iconColorSelection, setIconColorSelection] = useState("");

  useEffect(() => {
    setProjectName(currentProject.name);
    setProjectDescription(currentProject.description);
  }, [currentProject]);

  const moreContent = (
    <div>
      <p>
        <Link className="single-navigation__link" to={`/${path.split("/")[1]}/sessions`}>
          <FundProjectionScreenOutlined className="single-navigation__link-icon" />
          <span>Sessions</span>
        </Link>
      </p>
      <p>
        <Link className="single-navigation__link" to={`/${path.split("/")[1]}/tracker`}>
          <DashboardOutlined className="single-navigation__link-icon" />
          <span>Time Tracker</span>
        </Link>
      </p>
      <p>
        <Link className="single-navigation__link" to={`/${path.split("/")[1]}/documents`}>
          <FileTextOutlined className="single-navigation__link-icon" />
          <span>Files</span>
        </Link>
      </p>
      <p>
        <Link className="single-navigation__link" to={`/${path.split("/")[1]}/report`}>
          <PieChartOutlined className="single-navigation__link-icon" />
          <span>Report</span>
        </Link>
      </p>
      <p>
        <Link className="single-navigation__link" to={`/${path.split("/")[1]}/tags`}>
          <TagsOutlined className="single-navigation__link-icon" />
          <span>Tags</span>
        </Link>
      </p>
      <p>
        <Link className="single-navigation__link" to={`/${path.split("/")[1]}/budget`}>
          <DollarOutlined className="single-navigation__link-icon" />
          <span>Budget</span>
        </Link>
      </p>
      {user_role !== "Member" && (
        <>
          <p>
            <Link className="single-navigation__link" to={`/${path.split("/")[1]}/reviews`}>
              <FundOutlined className="single-navigation__link-icon" />
              <span>Reviews</span>
            </Link>
          </p>
        </>
      )}
      <p>
        <Link className="single-navigation__link" to={`/${path.split("/")[1]}/activities`}>
          <EyeOutlined className="single-navigation__link-icon" />
          <span style={{ marginRight: "5px" }}>Activities</span>
        </Link>
      </p>
    </div>
  );

  const showModal = () => {
    setIsModalVisible(true);
  };

  const deleteHandler = () => {
    dispatch(deleteProject({ project_id: currentProject.id, push: push }));
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleIconColor = (color: string) => {
    setIconColorSelection(color);
    dispatch(updateColor({ project_id: currentProject.id, color: color }));
  };

  const changeProjectNameHandler = () => {
    if (projectName !== currentProject.name) {
      dispatch(changeName({ project_id: currentProject.id, name: projectName }));
    }
  };

  const projectStatusHandle = (e: any) => {
    dispatch(updateStatus({ project_id: currentProject.id, status: e.target.value }));
  };

  const currencyHandle = (value: string) => {
    dispatch(setCurrency({ project_id: currentProject.id, currency: value }));
  };

  return (
    <>
      {auth === false ? (
        ""
      ) : (
        <div className="single-navigation">
          <div className="single-navigation__identity">
            <div className="single-navigation__icon">
              <div className="single-navigation__box" onClick={() => setIsModalVisible(true)} style={{ backgroundColor: currentProject.color !== null || currentProject.color !== undefined ? currentProject.color : "grey" }}>
                <AvatarIcon firstname={currentProject.name} />
              </div>
            </div>
            <div className="single-navigation__title">
              <div className="single-navigation__name">
                <span style={{ marginRight: "4px", color: "#2f3542" }}>{currentProject && currentProject.name}</span>
              </div>
            </div>
          </div>
          <nav className="single-navigation__list">
            <li className="single-navigation__item">
              <Link className="single-navigation__link" to={`/${path.split("/")[1]}/overview`}>
                <LayoutOutlined className="single-navigation__link-icon" />
                <span>Overview</span>
              </Link>
            </li>
            <li className="single-navigation__item">
              <Link className="single-navigation__link" to={`/${path.split("/")[1]}/tasks`}>
                <BarsOutlined className="single-navigation__link-icon" />
                <span>Tasks</span>
              </Link>
            </li>
            <li className="single-navigation__item">
              <Link className="single-navigation__link" to={`/${path.split("/")[1]}/board`}>
                <ProjectOutlined className="single-navigation__link-icon" />
                <span>Board</span>
              </Link>
            </li>
            <li className="single-navigation__item">
              <Link className="single-navigation__link" to={`/${path.split("/")[1]}/calendar`}>
                <CalendarOutlined className="single-navigation__link-icon" />
                <span>Calendar</span>
              </Link>
            </li>
            <li className="single-navigation__item">
              <Link className="single-navigation__link" to={`/${path.split("/")[1]}/messages`}>
                <CommentOutlined className="single-navigation__link-icon" />
                <span>Messages</span>
              </Link>
            </li>
            <li className="single-navigation__item">
              <Link className="single-navigation__link" to={`/${path.split("/")[1]}/team`}>
                <TeamOutlined className="single-navigation__link-icon" />
                <span>Team</span>
              </Link>
            </li>
            <li className="single-navigation__item" style={{ display: "flex" }}>
              <Popover className="popover" placement="bottom" content={moreContent} trigger="click">
                <Link className="single-navigation__link" to="">
                  <EllipsisOutlined className="single-navigation__link-icon" style={{ fontSize: "25px" }} />
                </Link>
              </Popover>
            </li>
          </nav>
          <Modal title="Project Details" width="40%" centered visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
            <div className="project-detail__icon-box" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "10px" }}>
              <div className="icon-box" style={{ width: "100px", height: "100px", backgroundColor: currentProject.color, display: "flex", justifyContent: "center", alignItems: "center", fontSize: "50px", borderRadius: "12px", color: "white" }}></div>
              <div className="icon-box__select">
                <Button disabled={user_role === "Member" ? true : false} onClick={() => setIconTab((prev) => !prev)}>
                  Change Color
                </Button>
                {showIconTab && (
                  <div className="icon-custombox" style={{ position: "absolute", marginTop: "5px", zIndex: 99999, backgroundColor: "white", boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px", padding: "15px 15px", borderRadius: "12px", width: "350px" }}>
                    <div className="icon-colorbox" style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                      {colorList.map((item: any, index: number) => (
                        <div onClick={() => handleIconColor(item.code)} key={index} style={{ backgroundColor: item.code, width: "50px", height: "50px", borderRadius: "12px" }}></div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
            <Form>
              <Form.Item>
                <label>Project name</label>
                <Input disabled={user_role === "Member" ? true : false} value={projectName} onBlur={changeProjectNameHandler} onChange={(e) => setProjectName(e.target.value)} />
              </Form.Item>
              <Form.Item>
                <label>Project description</label>
                <TextArea disabled={user_role === "Member" ? true : false} rows={4} value={projectDescription} placeholder="Set new description..." />
              </Form.Item>
              <Form.Item>
                <Select disabled={user_role === "Member" ? true : false} defaultValue={currentProject.currency} style={{ width: 120 }} onChange={currencyHandle}>
                  <Option value="czk">CZK</Option>
                  <Option value="usd">USD</Option>
                  <Option value="eur">EUR</Option>
                </Select>
              </Form.Item>
              <Form.Item>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
                  <div>
                    <p>Project status</p>
                    <Radio.Group disabled={user_role === "Member" ? true : false} onChange={projectStatusHandle} defaultValue={currentProject.project_status_id}>
                      <Radio.Button value="0">On Progress</Radio.Button>
                      <Radio.Button value="1">Completed</Radio.Button>
                      <Radio.Button value="2">Canceled</Radio.Button>
                    </Radio.Group>
                  </div>
                  <div>
                    <Button onClick={deleteHandler} type="primary" disabled={user_role === "Owner" ? false : true} danger>
                      Delete Project
                    </Button>
                  </div>
                </div>
              </Form.Item>
            </Form>
          </Modal>
        </div>
      )}
    </>
  );
};

export default withRouter(ProjectNavigation);
