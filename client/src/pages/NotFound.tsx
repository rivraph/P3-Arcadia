function NotFound() {
  const handleClick = () => {
    window.location.href = "/homepage";
  };
  return (
    <>
      <div> </div>
      <p>Page NOT FOUND error 404</p>;
      <button type="button" onClick={handleClick}>
        Return HomPage
      </button>
      <div> </div>
    </>
  );
}

export default NotFound;
