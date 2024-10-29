// src/components/TicketCard.js
import React from "react";
import "./TicketCard.css";

function TicketCard({ ticket, user }) {
  const currGrouping = localStorage.getItem("grouping");
  const currSorting = localStorage.getItem("sorting");
  console.log(currGrouping, currSorting);

  return (
    <div className="ticket-card">
      <div className="ticket-header">
        <span className="ticket-id">{ticket.id}</span>
        {user && currGrouping !== "user" && (
          <div className="user-avatar">{user.name.charAt(0)}</div>
        )}
      </div>
      <div className="ticket-title">
        <div style={{
          marginTop: "2px",
        }}>
        {currGrouping === "status" ? "" : getStatusIcon(ticket.status)}{" "}
        </div>
        <div style={{
          fontWeight: "500",
          fontSize: "16px",
        }}>{ticket.title}</div>
      </div>
      <div className="ticket-footer">
        {currGrouping !== "priority" && (
          <div className="priority-tag">{getPriorityIcon(ticket.priority)}</div>
        )}
        <div className="tag"><div className="dot"></div>{ticket.tag}</div>
      </div>
    </div>
  );
}

function getPriorityIcon(priority) {
  const priorities = {
    4: <img src="/assets/SVG - Urgent Priority grey.svg" alt="Urgent" />,
    3: <img src="/assets/Img - High Priority.svg" alt="High" />,
    2: <img src="/assets/Img - Medium Priority.svg" alt="Medium" />,
    1: <img src="/assets/Img - Low Priority.svg" alt="Low" />,
    0: <img src="/assets/No-priority.svg" alt="No Priority" />,
  };
  return priorities[priority];
}

function getStatusIcon(status) {
  const statuses = {
    Todo: <img src="/assets/To-do.svg" alt="ToDo" />,
    "In progress": <img src="/assets/in-progress.svg" alt="In Progress" />,
    Backlog: <img src="/assets/Backlog.svg" alt="Backlog" />,
    Done: <img src="/assets/done.svg" alt="Done" />,
    Cancelled: <img src="/assets/Cancelled.svg" alt="Cancelled" />,
  };
  return statuses[status];
}

export default TicketCard;
