import style from "./modal.module.css";

const Modal = ({
  children,
  title,
  onClose,
  onProceed,
  labelProceed = "Save",
  labelClose = "Close",
}) => {
  return (
    <aside className={style.wrapper}>
      <div className={style.mask} onClick={onClose}></div>
      <div className={style.modal}>
        <h1 className={style.modal__title}>{title}</h1>
        <div className={style.modal__content}>{children}</div>
        <div className={style.modal__actions}>
          <button classNames={style.actions__proceed} onClick={onProceed}>
            {labelProceed}
          </button>
          <button classNames={style.actions__close} onClick={onClose}>
            {labelClose}
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Modal;
