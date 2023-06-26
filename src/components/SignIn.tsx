export default function SignIn() {
  return (
    <>
      <h2 className="underline"> Sign up for push notifications </h2>
      <form className="my-4 flex flex-col" action={async (formData) => {}}>
        <div>
          <label htmlFor="userName">User identifier : </label>
          <input
            type="text"
            id="userName"
            name="userName"
            className="border shadow-inner "
          ></input>
        </div>
        <div>
          <label htmlFor="pushDescription">
            Description for this pushSubscription :
          </label>
          <input
            type="text"
            id="pushDescription"
            name="pushDescription"
            className="border shadow-inner"
          ></input>
        </div>

        <button
          type="submit"
          className="border px-2 rounded-lg shadow-lg ml-2 w-48"
        >
          Submit
        </button>
      </form>
    </>
  );
}
