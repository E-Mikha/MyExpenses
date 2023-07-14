import { Header } from "./Header/Header";

export const CostsPage = () => {
  return (
    <div className="container">
      <h2 style={{ textAlign: "center", marginBottom: 30 }}>
        Accounting for my expenses
      </h2>
      <Header costs={[]} />
    </div>
  );
};
