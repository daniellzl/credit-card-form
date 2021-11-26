import CSS from "./custom-input.module.scss";

const CustomInput = ({ handleInput, handleBlur, label, ...otherProps }) => {
  return (
    <div className={CSS.customInputFrame}>
      <input
        className={CSS.customInput}
        onInput={handleInput}
        onBlur={handleBlur}
        {...otherProps}
      />
      <label
        className={`${CSS.customInputLabel}  ${
          otherProps.value.length ? CSS.shrink : ""
        }`}
      >
        {label}
      </label>
    </div>
  );
};

export default CustomInput;
