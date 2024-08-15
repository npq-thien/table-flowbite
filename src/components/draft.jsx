import React from "react";

const draft = () => {
  return (
    <div>
      <input
        className="p-2 border border-black"
        defaultValue={formData.age}
        {...register("age")}
      />
      <input
        className="p-2 border border-black"
        defaultValue={formData.gender}
        {...register("gender")}
      />
      <input
        className="p-2 border border-black"
        defaultValue={formData.email}
        {...register("email")}
      />
    </div>
  );
};

export default draft;
