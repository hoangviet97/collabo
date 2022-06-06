import React from "react";

const Filter = () => {
  return (
    <div className="task-filter" style={{ display: "flex", justifyContent: "space-between" }}>
      <Input value={taskNameForSearch} onChange={(e) => setTaskNameForSearch(e.target.value)} placeholder="Search tasks by name" style={{ width: "40%" }} />
      <div>
        <span>Filter by: &nbsp;</span>
        <Button onClick={showTagSelectorHandler}>
          <TagsOutlined />
          Tags
        </Button>
        <Button onClick={statusSelectorHandler}>
          <TagsOutlined />
          Status
        </Button>
        <Button onClick={showTagSelectorHandler}>
          <TagsOutlined />
          Priority
        </Button>
        <Button onClick={showTagSelectorHandler}>
          <StarFilled />
        </Button>
      </div>
    </div>
  );
};

export default Filter;
