import { LotesDataInterface, LotesStatus } from "@/types";

interface Phase1SVGInterface {
  lotesData: LotesDataInterface[] | undefined;
}

export default function Phase1SVG({ lotesData }: Phase1SVGInterface) {
  // GET COLOR FOR STATUS
  const getColor = (svgId: string): string => {
    const lote = lotesData?.find((lote) => lote.label.replace(/\s+/g, "_") === svgId);
    if (lote?.situation === LotesStatus.Sold) {
      return "#005cdbff";
    } else if (lote?.situation === LotesStatus.Blocked) {
      return "#005cdbff";
    } else {
      return "none";
    }
  };

  return (
    <svg version="1.1" id="Phase1SVG" viewBox="0 0 3160 1733" className="z-0 rounded-xl absolute">
      <path
        fill={getColor("Quadra_1_-_Lote_9")}
        d="m 796,233 1,261 87,-2 1,-260"
        id="Quadra_1_-_Lote_9"
      />
      <path
        fill={getColor("Quadra_1_-_Lote_10")}
        d="m 159.98575,492.84201 205.0824,-1.07373 v 261.99009 l -59.05514,-1.07373 z"
        id="Quadra_1_-_Lote_10"
      />
      <path
        fill={getColor("Quadra_2_-_Lote_13")}
        d="m 1239.6211,491.23141 87.509,1.07373 -0.5369,260.91636 -87.5089,-1.07373 z"
        id="Quadra_2_-_Lote_13"
      />
      <path
        fill={getColor("Quadra_2_-_Lote_18")}
        d="m 1498.9269,665.71252 h 260.9163 l -0.5368,86.97212 H 1498.39 Z"
        id="Quadra_2_-_Lote_18"
      />
      <path fill={getColor("Quadra_3_-_Lote_6")} d="m 2314,207.5 0.5,286 85,-0.5 0.5,-290.5 z" id="Quadra_3_-_Lote_6" />
      <path fill={getColor("Quadra_3_-_Lote_7")} d="m 2400.5,203 86.5,-4 v 293.5 l -88,-1 z" id="Quadra_3_-_Lote_7" />
      <path
        fill={getColor("Quadra_3_-_Lote_8")}
        d="m 2485.6846,199.17689 1.6106,293.66512 86.9722,-0.53687 V 192.19765 Z"
        id="Quadra_3_-_Lote_8"
      />
      <path
        fill={getColor("Quadra_3_-_Lote_9")}
        d="m 2572.6568,193.27138 60.6657,-2.14746 121.3315,216.89343 -180.3866,-2.14746 z"
        id="Quadra_3_-_Lote_9"
      />

      <path
        fill={getColor("Quadra_3_-_Lote_13")}
        d="m 1879.5641,666.24938 261.4533,-0.53686 v 86.97212 h -261.4533 z"
        id="Quadra_3_-_Lote_13"
      />
      <path
        fill={getColor("Quadra_3_-_Lote_17")}
        d="m 2399.9629,492.74784 h 87.3128 v 258.90141 l -88.072,0.75924 z"
        id="Quadra_3_-_Lote_17"
      />
      <path
        fill={getColor("Quadra_4_-_Lote_5")}
        d="m 1499.8819,847.3137 h 260.0403 l -0.3796,86.55355 h -260.4199 z"
        id="Quadra_4_-_Lote_5"
      />
      <path
        fill={getColor("Quadra_4_-_Lote_13")}
        d="m 1326.5323,1063.3673 0.6951,255.6369 86.1933,36.5195 -2.0853,-291.4541 z"
        id="Quadra_4_-_Lote_13"
      />
      <path
        fill={getColor("Quadra_5_-_Lote_1")}
        d="m 1880.101,847.70973 87.509,0.53686 -0.5369,257.69521 h -86.9721 z"
        id="Quadra_5_-_Lote_1"
      />
      <path
        fill={getColor("Quadra_5_-_Lote_12")}
        d="m 1881.7116,1193.9876 258.232,-0.5369 v 88.0459 h -260.9163 z"
        id="Quadra_5_-_Lote_12"
      />
      <path
        fill={getColor("Quadra_5_-_Lote_13")}
        d="m 1880.6379,1366.8581 259.8426,-0.5368 -0.5369,-86.9722 h -260.9163 z"
        id="Quadra_5_-_Lote_13"
      />
      <path
        fill={getColor("Quadra_6_-_Lote_6")}
        d="m 2494.1089,1279.7018 217.9023,0.7593 v 87.6924 l -216.7635,80.4796 z"
        id="Quadra_6_-_Lote_6"
      />
      <path
        fill={getColor("Quadra_6_-_Lote_11")}
        d="m 2710.8724,1106.5947 325.7147,-0.3796 -95.6645,89.9701 -230.4298,-1.8981 z"
        id="Quadra_6_-_Lote_11"
      />
    </svg>
  );
}
