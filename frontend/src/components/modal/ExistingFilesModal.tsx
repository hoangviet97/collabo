import React, { FC, useEffect } from "react";
import { Breadcrumb, Button, Modal, Input, Avatar, Select } from "antd";
import { getAllFiles } from "../../actions/file";
import { useDispatch, useSelector, RootStateOrAny } from "react-redux";
import { useParams } from "react-router-dom";
import { file } from "../../types/types";

interface Props {
  isVisible: boolean;
  close: any;
}

const ExistingFilesModal: FC<Props> = ({ isVisible, close }) => {
  const { Option } = Select;
  const dispatch = useDispatch();
  const params: any = useParams();
  const files = useSelector((state: RootStateOrAny) => state.file.files);

  useEffect(() => {
    dispatch(getAllFiles({ project_id: params.id }));
  }, []);

  return (
    <Modal title="Basic Modal" width="500px" visible={isVisible} onCancel={() => close(false)} footer={null}>
      <Select style={{ width: 120 }}>
        {files.map((item: file) => {
          <Option value={item.id}>{item.title}</Option>;
        })}
      </Select>
    </Modal>
  );
};

export default ExistingFilesModal;
