import React from "react";
import styles from "../../css/Conversations/Conversations.module.css";
import { Image } from "react-bootstrap";
import icon3 from "../../assets/icon3.jpg";
import icon from "../../assets/icon3.jpg";
import call from "../../assets/call.png";
import video from "../../assets/video.png";
import cancel from "../../assets/cancel.png";

const Conversations = ({ handleConversationChange, activeConvUuid }) => {
  return (
    <>
      <div className={styles.userChat}>
        <div className={styles.heading}>
          <div className={styles.userCont}>
            <Image src={icon3} fluid className={styles.userImageRef} />
            <h3 className={styles.name}>{activeConvUuid}</h3>
          </div>
          <div className={styles.vc}>
            <Image src={call}></Image>
            <Image src={video}></Image>
            <Image src={cancel}></Image>
          </div>
        </div>

        <div className={styles.owner}>
          <div className={styles.profile}>
            {/* <Image className={styles.userImageRef} src="http://localhost:3010/static/media/icon.7ff84cd1.jpg"></Image> */}
            <Image src={icon} fluid className={styles.userImageRef} />
            <div className={styles.content}>
              <div className={styles.msgText1}>Nice to meet ya!</div>
            </div>
          </div>
        </div>

        <div className={styles.msg}>
          <div className={styles.msgProfile}>
            <Image src={icon3} fluid className={styles.userImageRef} />
            <div clssName={styles.msgContent}>
              <div className={styles.msgText2}>
                What's your name? Let me treat ya to a drink
              </div>
            </div>
          </div>
        </div>

        <div class={styles.chatAreaFooter}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="feather feather-video"
          >
            <path d="M23 7l-7 5 7 5V7z" />
            <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="feather feather-image"
          >
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
            <circle cx="8.5" cy="8.5" r="1.5" />
            <path d="M21 15l-5-5L5 21" />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="feather feather-plus-circle"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M12 8v8M8 12h8" />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="feather feather-paperclip"
          >
            <path d="M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66l-9.2 9.19a2 2 0 01-2.83-2.83l8.49-8.48" />
          </svg>
          <input type="text" placeholder="Type something here..." />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="feather feather-smile"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M8 14s1.5 2 4 2 4-2 4-2M9 9h.01M15 9h.01" />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="feather feather-thumbs-up"
          >
            <path d="M14 9V5a3 3 0 00-3-3l-4 9v11h11.28a2 2 0 002-1.7l1.38-9a2 2 0 00-2-2.3zM7 22H4a2 2 0 01-2-2v-7a2 2 0 012-2h3" />
          </svg>
        </div>
      </div>
    </>
  );
};

export default Conversations;