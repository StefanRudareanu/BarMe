import dayjs from "dayjs";

interface invitationdata {
  eventDate: string;
  eventPlace: string;
  drinks: string[];
  sender: string;
  reciver: string;
}
const HandleInvitation = () => {
  return {
    async CreateInvitation(token: string, data: invitationdata) {
      return await fetch("http://localhost:4000/api/event", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          "auth-token": token,
        },
        body: JSON.stringify(data),
      });
    },
    async GetInvitationBarman(token: string, username: string) {
      return await fetch(
        `http://localhost:4000/api/event/invitationbarman/${username}`,
        {
          method: "GET",
          headers: {
            "Content-type": "application/json",
            "auth-token": token,
          },
        }
      );
    },
    async GetInvitationUsers(token: string, username: string) {
      return await fetch(
        `http://localhost:4000/api/event/invitationbarman/${username}`,
        {
          method: "GET",
          headers: {
            "Content-type": "application/json",
            "auth-token": token,
          },
        }
      );
    },
    async DelteInvitation(token: string, invitationid: string) {
      return await fetch(`http://localhost:4000/api/event/${invitationid}`, {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
          "auth-token": token,
        },
      });
    },
  };
};
export default HandleInvitation;
