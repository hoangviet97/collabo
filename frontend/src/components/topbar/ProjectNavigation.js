import React, { useState, useEffect } from "react";
import { Popover, Modal, Form, Input, Dropdown, Menu, Button, Radio } from "antd";
import { ThunderboltOutlined, TrophyOutlined, ShareAltOutlined, FireOutlined, DingtalkOutlined, CrownOutlined, CalendarOutlined, DownOutlined, FileTextOutlined, DashboardOutlined, TeamOutlined, FundProjectionScreenOutlined, NumberOutlined, BarsOutlined, LayoutOutlined, ProjectOutlined, EllipsisOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateColor, updateStatus } from "../../actions/project";
import { getProjectTasks } from "../../actions/task";

const ProjectNavigation = (props) => {
  let path = window.location.pathname;

  const dispatch = useDispatch();
  const currentProject = useSelector((state) => state.project.currentProject);
  const tasks = useSelector((state) => state.task.tasks);
  const [totalBudget, setTotalBudget] = useState(0);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [projectName, setProjectName] = useState("");
  const [showIconTab, setIconTab] = useState(false);
  const [projectDescription, setProjectDescription] = useState("");
  const colorSet = ["#f9ca24", "#f0932b", "#eb4d4b", "#badc58", "#7ed6df", "#e056fd", "#686de0", "#30336b", "#535c68"];
  const [iconColorSelection, setIconColorSelection] = useState(colorSet[0]);

  useEffect(() => {
    setProjectName(currentProject.name);
    setProjectDescription(currentProject.description);

    tasks.map((i) => totalBudget.push(i.budget));
  }, [currentProject]);

  const moreContent = (
    <div>
      <p>
        <Link className="single-navigation__item" to={`/${path.split("/")[1]}/sessions`}>
          <FundProjectionScreenOutlined className="single-navigation__link-icon" />
          <span>Sessions</span>
        </Link>
      </p>
      <p>
        <Link className="single-navigation__item" to={`/${path.split("/")[1]}/tracker`}>
          <DashboardOutlined className="single-navigation__link-icon" />
          <span>Time Tracker</span>
        </Link>
      </p>
      <p>
        <Link className="single-navigation__item" to={`/${path.split("/")[1]}/documents`}>
          <FileTextOutlined className="single-navigation__link-icon" />
          <span>Files</span>
        </Link>
      </p>
      <p>
        <Link className="single-navigation__item" to={`/${path.split("/")[1]}/report`}>
          <FileTextOutlined className="single-navigation__link-icon" />
          <span>Report</span>
        </Link>
      </p>
    </div>
  );

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleIconColor = (color) => {
    setIconColorSelection(color);
    dispatch(updateColor({ id: currentProject.id, color: color, project: currentProject.id }));
  };

  const projectStatusHandle = (e) => {
    dispatch(updateStatus({ id: currentProject.id, status: e.target.value, project: currentProject.id }));
  };

  const projectInfoMenu = (
    <Menu>
      <Menu.Item>
        <a onClick={showModal}>Show details</a>
      </Menu.Item>
    </Menu>
  );

  return (
    <div className="single-navigation">
      <div className="single-navigation__identity">
        <div className="single-navigation__icon">
          <div style={{ width: "40px", height: "40px", borderRadius: "8px", backgroundColor: currentProject.color !== null ? currentProject.color : "grey" }}></div>
        </div>
        <div className="single-navigation__title">
          <Dropdown overlay={projectInfoMenu} placement="bottomCenter">
            <span>{currentProject && currentProject.name}</span>
          </Dropdown>
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
          <Link className="single-navigation__item" to={`/${path.split("/")[1]}/team`}>
            <TeamOutlined className="single-navigation__link-icon" />
            <span>Team</span>
          </Link>
        </li>
        <li className="single-navigation__item">
          <Popover className="popover" placement="bottom" content={moreContent} trigger="click">
            <Link className="single-navigation__link" to="">
              <EllipsisOutlined className="single-navigation__link-icon" style={{ fontSize: "25px" }} />
            </Link>
          </Popover>
        </li>
      </nav>
      <Modal title="Project Details" width="70%" centered visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <div class="project-detail__icon-box" style={{ display: "flex", gap: "10px" }}>
          <div class="icon-box" style={{ width: "100px", height: "100px", backgroundColor: iconColorSelection, display: "flex", justifyContent: "center", alignItems: "center", fontSize: "50px", borderRadius: "12px", color: "white" }}></div>
          <div className="icon-box__select">
            <Button onClick={() => setIconTab((prev) => !prev)}>Change Icon</Button>
            {showIconTab && (
              <div className="icon-custombox" style={{ position: "absolute", marginTop: "5px", zIndex: "99999", backgroundColor: "white", boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px", padding: "15px 15px", borderRadius: "12px", width: "350px" }}>
                <div class="icon-colorbox" style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                  {colorSet.map((item, index) => (
                    <div onClick={() => handleIconColor(item)} key={index} style={{ backgroundColor: item, width: "50px", height: "50px", borderRadius: "12px" }}></div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
        <Form>
          <Form.Item>
            <label>Project name</label>
            <Input value={projectName} />
          </Form.Item>
          <Form.Item>
            <label>Project description</label>
            <Input value={projectDescription} />
          </Form.Item>
          <Form.Item>
            <Radio.Group onChange={projectStatusHandle} defaultValue={currentProject.project_status_id}>
              <Radio.Button value="0">On Progress</Radio.Button>
              <Radio.Button value="1">Completed</Radio.Button>
              <Radio.Button value="2">Canceled</Radio.Button>
            </Radio.Group>
          </Form.Item>
        </Form>
        <div>
          <div class="total__budget">Total budget: {totalBudget}</div>
        </div>
      </Modal>
    </div>
  );
};

export default ProjectNavigation;
