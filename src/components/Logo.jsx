export const Logo = () => {
  return (
    <div className="flex items-center gap-x-2">
      <LogoImage />
      <span className="text-[24px] font-bold text-black">FocusShield</span>
    </div>
  );
};

function LogoImage() {
  return (
    <svg
      width="36"
      height="36"
      viewBox="0 0 19 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M17.8323 3.26888L10.2323 0.143571C10.0008 0.0487881 9.75261 0 9.50198 0C9.25134 0 9.00317 0.0487881 8.77167 0.143571L1.17167 3.26888C0.463125 3.55797 0 4.24163 0 4.99951C0 12.7542 4.53229 18.1141 8.76771 19.8564C9.23479 20.0479 9.76125 20.0479 10.2283 19.8564C13.6206 18.4618 19 13.6449 19 4.99951C19 4.24163 18.5369 3.55797 17.8323 3.26888ZM9.50396 17.4343L9.5 2.55006L16.4627 5.41362C16.3321 11.3283 13.2129 15.6138 9.50396 17.4343Z"
        fill="#000000"
      />
    </svg>
  );
}