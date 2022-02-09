export default function ChoicesCard({ src, name, onClick, className }) {
  // console.log(isActive);
  return (
    <div className={className} onClick={onClick}>
      <img src={src} alt="" />
      <h4>{name}</h4>
    </div>
  );
}
