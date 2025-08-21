import s from "./Button.module.scss";

export const Button = ({ title }) => {
  return (
    <>
      <button className={s.button}>
        <span className={s.button__text}>{title}</span>
        <span className={s.button__arrow}>
          <svg
            width="13"
            height="13"
            viewBox="0 0 13 13"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M11.0037 3.41421L2.39712 12.0208L0.98291 10.6066L9.5895 2H2.00373V0H13.0037V11H11.0037V3.41421Z" />
          </svg>
        </span>
      </button>
    </>
  );
};
