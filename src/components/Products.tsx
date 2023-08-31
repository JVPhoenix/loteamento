import ProductsPhase1 from "./ProductsPhase1";
import ProductsPhase2 from "./ProductsPhase2";

export default function Products() {

  return (
    <div className="flex flex-col gap-4 text-gray1 font-medium text-center items-center mb-8">
      <ProductsPhase1 />
      <ProductsPhase2 />
    </div>
  );
}
