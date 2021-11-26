import CSS from "./custom-input.module.scss";

const CustomInput = ({ label, ...otherProps }) => {
  return (
    <div className={CSS.customInputFrame}>
      <input className={CSS.customInput} {...otherProps} />
      <label
        className={`${CSS.customInputLabel}  ${
          otherProps.value?.length ? CSS.shrink : ""
        }`}
      >
        {label}
      </label>
    </div>
  );
};

export default CustomInput;
