import AppTable from "./components/app.table";

export default function Home() {
  return (
    <div>
      <ul>
        <li>
          <a href="https://facebook.com" >Facebook</a>
        </li>
        <li>
          <a href="https://youtube.com">Youtube</a>
        </li>
        <li>
          <a href="https://tiktok.com">Tiktok</a>
        </li>
      </ul>
      <AppTable />
    </div>
  );
}
