const ColorImageToggler = ({
  tab,
  handleImageChange,
  bgColor,
}: {
  tab: string;
  handleImageChange: any;
  bgColor: string;
}) => {
  return (
    <div className="bg-gray-300 p-2  ">
      {tab === "color" ? (
        <div className="flex gap-2 items-center">
          <span>Background Color:</span>
          <input type="color" name="bgColor" defaultValue={bgColor} />
        </div>
      ) : (
        <div className="">
          <label htmlFor="bgImage">Choose Image</label>
          <input
            type="file"
            onChange={handleImageChange}
            name="bgImage"
            id="bgImage"
            className="hidden"
          />
        </div>
      )}
    </div>
  );
};

export default ColorImageToggler;
