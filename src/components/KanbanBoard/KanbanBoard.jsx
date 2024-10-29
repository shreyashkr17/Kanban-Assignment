// src/components/KanbanBoard.js
import React from "react";
import "./KanbanBoard.css";
import TicketCard from "../TicketCard/TicketCard";

function getPriorityIcon(priority) {
  const priorities = {
    Urgent: <img src="/assets/SVG - Urgent Priority colour.svg" alt="Urgent" />,
    High: <img src="/assets/Img - High Priority.svg" alt="High" />,
    Medium: <img src="/assets/Img - Medium Priority.svg" alt="Medium" />,
    Low: <img src="/assets/Img - Low Priority.svg" alt="Low" />,
    "No Priority": <img src="/assets/No-priority.svg" alt="No Priority" />,
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

function KanbanBoard({ tickets, users, grouping, sorting }) {
  const groupTickets = () => {
    let grouped = {};
    let counts = {};

    switch (grouping) {
      case "status":
        grouped = tickets.reduce((acc, ticket) => {
          const status = ticket.status;
          if (!acc[status]) acc[status] = [];
          acc[status].push(ticket);
          return acc;
        }, {});
        break;

      case "user":
        grouped = tickets.reduce((acc, ticket) => {
          const user = users.find((u) => u.id === ticket.userId);
          const userName = user ? user.name : "Unassigned";
          if (!acc[userName]) acc[userName] = [];
          acc[userName].push(ticket);
          return acc;
        }, {});
        break;

      case "priority":
        const priorities = {
          4: "Urgent",
          3: "High",
          2: "Medium",
          1: "Low",
          0: "No Priority",
        };
        grouped = tickets.reduce((acc, ticket) => {
          const priority = priorities[ticket.priority];
          if (!acc[priority]) acc[priority] = [];
          acc[priority].push(ticket);
          return acc;
        }, {});
        break;

      default:
        break;
    }

    // Sort tickets within each group
    Object.keys(grouped).forEach((key) => {
      grouped[key].sort((a, b) => {
        if (sorting === "priority") {
          return b.priority - a.priority;
        } else {
          return a.title.localeCompare(b.title);
        }
      });
      counts[key] = grouped[key].length;
    });

    return { grouped, counts };
  };

  const { grouped: groupedTickets, counts } = groupTickets();

  return (
    <div className="kanban-board">
      {Object.entries(groupedTickets).map(([group, tickets]) => (
        <div key={group} className="ticket-column">
          <div className="ticket-header-part">
            <div className="ticket-subpart">

              {grouping === "user" && (
                <div className="user-avatar">
                  {users.find((u) => u.name === group)?.name.charAt(0)}
                </div>
              )}
              {grouping === "status" && getStatusIcon(group)}
              {grouping === "priority" && getPriorityIcon(group)}
              <span style={{
                fontWeight: "500",
                fontSize: "16px",
                color: "#000000",
              }}>{group}</span>
              <span style={{
                color: "#6e7275",
              }}>{counts[group]}</span>
            </div>
            <div className="ticket-subpart">
              <img src="/assets/add.svg" alt="add" />
              <img src="/assets/3 dot menu.svg" alt="menu" />
            </div>
          </div>
          <div className="tickets-container">
            {tickets.map((ticket) => (
              <TicketCard
                key={ticket.id}
                ticket={ticket}
                user={users.find((u) => u.id === ticket.userId)}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default KanbanBoard;
