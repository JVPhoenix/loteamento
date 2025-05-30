import { LotesDataInterface, LotesStatus } from "@/types";

interface Phase1SVGInterface {
  lotesData: LotesDataInterface[] | undefined;
}

export default function Phase2SVG({ lotesData }: Phase1SVGInterface) {
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
    <svg version="1.1" id="Phase2SVG" viewBox="0 0 8379 8919" className="z-0 rounded-xl absolute">
      <g id="g1">
        <g id="Quadra_1">
          <path
            fill={getColor("Quadra_1_-_Lote_1")}
            d="M 677.94914,5234.08 1830.6581,5769.4058 V 5228.2187 Z"
            id="Quadra_1_-_Lote_1"
          />
          <path
            fill={getColor("Quadra_1_-_Lote_3")}
            d="m 2105.4145,5219.3281 v 707.3308 l 276.3011,110.5205 -1.3815,-817.8513 z"
            id="Quadra_1_-_Lote_3"
          />
          <path
            fill={getColor("Quadra_1_-_Lote_4")}
            d="m 2383.0971,5222.0911 v 817.8513 l 274.9196,125.717 1.3815,-932.5163 z"
            id="Quadra_1_-_Lote_4"
          />
          <path
            fill={getColor("Quadra_1_-_Lote_5")}
            d="m 2659.3982,5234.5246 v 943.5683 l 276.3012,111.902 -1.3816,-1058.2333 z"
            id="Quadra_1_-_Lote_5"
          />
          <path
            fill={getColor("Quadra_1_-_Lote_8")}
            d="m 3486.456,5234.08 -0.9768,724.839 280.3622,-1.9538 -0.9769,-722.8852 z"
            id="Quadra_1_-_Lote_8"
          />
          <path
            fill={getColor("Quadra_1_-_Lote_9")}
            d="m 3485.5386,5957.0521 1.3815,592.6658 276.3011,120.191 -1.3815,-714.2384 z"
            id="Quadra_1_-_Lote_9"
          />
        </g>

        <g id="Quadra_2">
          <path
            fill={getColor("Quadra_2_-_Lote_1")}
            d="m 5140.3003,6786.3295 h 278.4085 l -0.9769,664.273 -276.4548,-131.8778 z"
            id="Quadra_2_-_Lote_1"
          />
          <path
            fill={getColor("Quadra_2_-_Lote_2")}
            d="m 4864.8224,6390.6964 h 552.9095 l 0.9769,397.5869 -554.8633,-0.9769 z"
            id="Quadra_2_-_Lote_2"
          />
          <path
            fill={getColor("Quadra_2_-_Lote_3")}
            d="m 4865.7992,6786.3295 -0.9768,416.1475 275.4779,118.2015 1.9537,-534.349 z"
            id="Quadra_2_-_Lote_3"
          />
          <path
            fill={getColor("Quadra_2_-_Lote_4")}
            d="m 4310.2974,6672.5274 1.3815,259.7231 555.3653,255.5785 -2.7631,-519.4461 z"
            id="Quadra_2_-_Lote_4"
          />
          <path
            fill={getColor("Quadra_2_-_Lote_5")}
            d="m 4864.2811,6392.2263 1.3815,280.4456 -558.1282,-4.1445 2.763,-279.0641 z"
            id="Quadra_2_-_Lote_5"
          />
        </g>
        <g id="Quadra_3">
          <path
            fill={getColor("Quadra_3_-_Lote_7")}
            d="m 7349.6097,7339.9391 1.3815,868.967 276.3011,41.4452 -2.763,-910.4122 z"
            id="Quadra_3_-_Lote_7"
          />
          <path
            fill={getColor("Quadra_3_-_Lote_8")}
            d="m 7625.9108,7338.5576 284.5901,2.763 v 958.7649 l -284.5901,-52.4972 z"
            id="Quadra_3_-_Lote_8"
          />
          <path
            fill={getColor("Quadra_3_-_Lote_9")}
            d="m 7624.5293,6392.2263 1.3815,949.0943 h 281.8271 l -1.3815,-951.8573 z"
            id="Quadra_3_-_Lote_9"
          />
          <path
            fill={getColor("Quadra_3_-_Lote_10")}
            d="m 7348.2282,6392.2263 1.3815,950.4758 277.6826,-1.3815 -2.763,-950.4758 z"
            id="Quadra_3_-_Lote_10"
          />
          <path
            fill={getColor("Quadra_3_-_Lote_11")}
            d="m 7071.9271,6392.2263 v 950.4758 l 277.6826,-2.763 v -951.8573 z"
            id="Quadra_3_-_Lote_11"
          />
          <path
            fill={getColor("Quadra_3_-_Lote_12")}
            d="m 6824.6376,6390.8448 v 950.4758 l 250.0525,-1.3815 -1.3815,-951.8573 z"
            id="Quadra_3_-_Lote_12"
          />
          <path
            fill={getColor("Quadra_3_-_Lote_13")}
            d="m 6549.7179,6392.2263 -1.3815,949.0943 h 276.3012 v -951.8573 z"
            id="Quadra_3_-_Lote_13"
          />
        </g>

        <g id="Quadra_4">
          <path
            fill={getColor("Quadra_4_-_Lote_1")}
            d="m 4310.2974,5798.1789 v 284.5902 l 556.7468,-5.5261 -1.3816,-280.4456 z"
            id="Quadra_4_-_Lote_1"
          />
          <path
            fill={getColor("Quadra_4_-_Lote_2")}
            d="m 4311.6789,5521.8778 h 555.3653 v 276.3011 h -558.1283 z"
            id="Quadra_4_-_Lote_2"
          />
          <path
            fill={getColor("Quadra_4_-_Lote_3")}
            d="m 4865.7992,5244.8256 v 279.3854 l -560.7245,-0.9769 v -280.3623 z"
            id="Quadra_4_-_Lote_3"
          />
          <path
            fill={getColor("Quadra_4_-_Lote_4")}
            d="m 4865.7992,5797.7351 0.9769,284.2697 557.7939,-2.9306 -4.8843,-282.316 z"
            id="Quadra_4_-_Lote_4"
          />
          <path
            fill={getColor("Quadra_4_-_Lote_5")}
            d="m 4865.7992,5521.2803 v 278.4085 l 559.7477,-0.9768 -3.9075,-278.4085 z"
            id="Quadra_4_-_Lote_5"
          />
          <path
            fill={getColor("Quadra_4_-_Lote_6")}
            d="m 4867.753,5241.895 -1.9538,282.316 h 562.6783 l -0.9769,-284.2698 z"
            id="Quadra_4_-_Lote_6"
          />
        </g>

        <g id="Quadra_5">
          <path
            fill={getColor("Quadra_5_-_Lote_1")}
            d="m 5715.2886,5798.1789 834.4293,1.3815 v 279.0641 l -837.1923,-1.3815 z"
            id="Quadra_5_-_Lote_1"
          />
          <path
            fill={getColor("Quadra_5_-_Lote_2")}
            d="m 5718.0516,5523.2593 v 279.0641 l 831.6663,-2.763 -1.3815,-277.6826 z"
            id="Quadra_5_-_Lote_2"
          />
          <path
            fill={getColor("Quadra_5_-_Lote_3")}
            d="m 5718.0516,5244.1952 833.0479,1.3815 -2.7631,279.0641 -833.0478,-2.763 z"
            id="Quadra_5_-_Lote_3"
          />
          <path
            fill={getColor("Quadra_5_-_Lote_6")}
            d="m 7100.9387,5245.5767 v 833.0478 l 276.3011,-1.3815 -2.763,-839.9554 z"
            id="Quadra_5_-_Lote_6"
          />
          <path
            fill={getColor("Quadra_5_-_Lote_7")}
            d="m 7375.8583,5244.1952 1.3815,834.4293 276.3011,-2.763 v -837.1923 z"
            id="Quadra_5_-_Lote_7"
          />
          <path
            fill={getColor("Quadra_5_-_Lote_8")}
            d="m 7653.5409,5244.1952 -1.3815,838.5739 256.96,-5.5261 1.3815,-835.8108 z"
            id="Quadra_5_-_Lote_8"
          />
        </g>

        <g id="Quadra_6">
          <path
            fill={getColor("Quadra_6_-_Lote_1")}
            d="m 450.37082,4112.7421 -1.38151,839.9554 276.30112,-4.1445 v -838.5739 z"
            id="Quadra_6_-_Lote_1"
          />
          <path
            fill={getColor("Quadra_6_-_Lote_3")}
            d="m 1000.21,4109.9791 1.3815,839.9554 277.6827,-2.763 -2.763,-834.4294 z"
            id="Quadra_6_-_Lote_3"
          />
          <path
            fill={getColor("Quadra_6_-_Lote_4")}
            d="m 1277.8927,4112.7421 v 837.1924 h 277.6826 v -838.5739 z"
            id="Quadra_6_-_Lote_4"
          />
          <path
            fill={getColor("Quadra_6_-_Lote_5")}
            d="m 1552.8123,4112.7421 2.763,844.0999 h 276.3011 l -2.763,-845.4814 z"
            id="Quadra_6_-_Lote_5"
          />
          <path
            fill={getColor("Quadra_6_-_Lote_6")}
            d="m 1829.1134,4112.7421 1.3815,837.1924 274.9196,-2.763 v -834.4294 z"
            id="Quadra_6_-_Lote_6"
          />
          <path
            fill={getColor("Quadra_6_-_Lote_7")}
            d="m 2105.4145,4112.7421 v 837.1924 l 276.3011,-2.763 v -835.8109 z"
            id="Quadra_6_-_Lote_7"
          />
          <path
            fill={getColor("Quadra_6_-_Lote_8")}
            d="m 2381.7156,4111.3606 v 838.5739 l 276.3011,-2.763 v -835.8109 z"
            id="Quadra_6_-_Lote_8"
          />
          <path
            fill={getColor("Quadra_6_-_Lote_9")}
            d="m 2656.6352,4111.3606 1.3815,841.3369 277.6827,1.3815 -1.3816,-844.0999 z"
            id="Quadra_6_-_Lote_9"
          />
          <path
            fill={getColor("Quadra_6_-_Lote_11")}
            d="m 2935.6994,4390.4247 852.3889,-1.3815 v 277.6826 l -855.152,-1.3815 z"
            id="Quadra_6_-_Lote_11"
          />
          <path
            fill={getColor("Quadra_6_-_Lote_12")}
            d="m 2932.9363,4112.7421 v 276.3011 h 841.3369 l 2.7631,-280.4456 z"
            id="Quadra_6_-_Lote_12"
          />
          <path
            fill={getColor("Quadra_6_-_Lote_16")}
            d="m 2659.3982,3267.2607 -1.3815,846.8629 h 277.6827 l -2.7631,-844.0999 z"
            id="Quadra_6_-_Lote_16"
          />
          <path
            fill={getColor("Quadra_6_-_Lote_17")}
            d="m 2381.7156,3272.7867 v 842.7184 l 277.6826,-1.3815 -1.3815,-844.0999 z"
            id="Quadra_6_-_Lote_17"
          />
          <path
            fill={getColor("Quadra_6_-_Lote_18")}
            d="m 2104.033,3271.4052 1.3815,844.0999 277.6826,-2.763 -1.3815,-844.0999 z"
            id="Quadra_6_-_Lote_18"
          />
          <path
            fill={getColor("Quadra_6_-_Lote_19")}
            d="m 1829.1134,3271.4052 v 841.3369 h 276.3011 v -846.8629 z"
            id="Quadra_6_-_Lote_19"
          />
          <path
            fill={getColor("Quadra_6_-_Lote_20")}
            d="m 1552.8123,3268.6422 1.3815,846.8629 276.3011,-1.3815 v -845.4814 z"
            id="Quadra_6_-_Lote_20"
          />
          <path
            fill={getColor("Quadra_6_-_Lote_22")}
            d="m 1277.8927,3272.7867 v 842.7184 l 276.3011,-1.3815 -1.3815,-837.1924 z"
            id="Quadra_6_-_Lote_21"
          />
          <path
            fill={getColor("Quadra_6_-_Lote_22")}
            d="m 1001.5915,3268.6422 v 845.4814 l 277.6827,-1.3815 -1.3815,-842.7184 z"
            id="Quadra_6_-_Lote_22"
          />
          <path
            fill={getColor("Quadra_6_-_Lote_23")}
            d="m 726.67193,3270.0237 -1.3815,844.0999 277.68257,-1.3815 -1.3815,-844.0999 z"
            id="Quadra_6_-_Lote_23"
          />
          <path
            fill={getColor("Quadra_6_-_Lote_24")}
            d="m 448.98931,3267.2607 1.38151,848.2444 276.30111,-2.763 v -841.3369 z"
            id="Quadra_6_-_Lote_24"
          />
        </g>

        <g id="Quadra_7">
          <path
            fill={getColor("Quadra_7_-_Lote_1")}
            d="m 7624.5293,4112.7421 2.763,888.3081 276.3011,-2.763 -2.763,-885.5451 z"
            id="Quadra_7_-_Lote_1"
          />
          <path
            fill={getColor("Quadra_7_-_Lote_2")}
            d="m 7348.2282,4114.1236 v 839.9554 l 279.0641,-2.763 -1.3815,-839.9554 z"
            id="Quadra_7_-_Lote_2"
          />
          <path
            fill={getColor("Quadra_7_-_Lote_3")}
            d="m 7071.9271,4112.7421 2.763,837.1924 h 276.3011 l -1.3815,-839.9554 z"
            id="Quadra_7_-_Lote_3"
          />
          <path
            fill={getColor("Quadra_7_-_Lote_4")}
            d="m 7073.3086,4114.1236 -1.3815,835.8109 -274.9197,-1.3815 v -837.1924 z"
            id="Quadra_7_-_Lote_4"
          />
          <path
            fill={getColor("Quadra_7_-_Lote_5")}
            d="m 6521.2095,4112.4224 v 843.8702 l 275.9918,2.89 1.445,-846.7602 z"
            id="Quadra_7_-_Lote_5"
          />
          <path
            fill={getColor("Quadra_7_-_Lote_6")}
            d="m 6246.6627,4112.4224 -2.89,845.3152 278.8818,-1.445 v -843.8702 z"
            id="Quadra_7_-_Lote_6"
          />
          <path
            fill={getColor("Quadra_7_-_Lote_7")}
            d="m 5967.7809,4113.8674 2.89,836.6453 274.5468,2.89 1.445,-840.9803 z"
            id="Quadra_7_-_Lote_7"
          />
          <path
            fill={getColor("Quadra_7_-_Lote_8")}
            d="m 5693.2341,4113.8674 2.89,838.0903 h 271.6568 l 1.445,-840.9803 z"
            id="Quadra_7_-_Lote_8"
          />
          <path
            fill={getColor("Quadra_7_-_Lote_9")}
            d="m 5415.7973,4112.4224 2.89,840.9803 275.9918,-1.445 v -839.5353 z"
            id="Quadra_7_-_Lote_9"
          />
          <path
            fill={getColor("Quadra_7_-_Lote_10")}
            d="m 5141.2505,4112.4224 v 839.5353 h 275.9918 v -840.9803 z"
            id="Quadra_7_-_Lote_10"
          />
          <path
            fill={getColor("Quadra_7_-_Lote_11")}
            d="m 4311.8301,4665.851 829.4204,1.445 v 280.3267 l -833.7554,-2.8899 z"
            id="Quadra_7_-_Lote_11"
          />
          <path
            fill={getColor("Quadra_7_-_Lote_12")}
            d="m 4307.4951,4389.8592 h 835.2004 v 275.9918 h -848.2052 z"
            id="Quadra_7_-_Lote_12"
          />
          <path
            fill={getColor("Quadra_7_-_Lote_13")}
            d="m 5141.2505,4113.8674 h -839.5353 l 1.445,278.8818 838.0903,-2.89 z"
            id="Quadra_7_-_Lote_13"
          />
          <path
            fill={getColor("Quadra_7_-_Lote_14")}
            d="m 5141.4836,3835.6776 -833.7541,1.0217 2.0435,276.8963 h 831.7106 z"
            id="Quadra_7_-_Lote_14"
          />
          <path
            fill={getColor("Quadra_7_-_Lote_15")}
            d="m 5141.4836,3559.803 h -837.8411 l 4.087,278.9398 836.8194,-3.0652 z"
            id="Quadra_7_-_Lote_15"
          />
          <path
            fill={getColor("Quadra_7_-_Lote_16")}
            d="m 5141.2505,3283.7245 -833.7553,0.7225 5.0574,277.4368 829.4204,-2.1675 z"
            id="Quadra_7_-_Lote_16"
          />
          <path
            fill={getColor("Quadra_7_-_Lote_17")}
            d="m 5417.3581,3283.9285 v 828.6453 h -276.8962 l 2.0435,-834.7758 z"
            id="Quadra_7_-_Lote_17"
          />
          <path
            fill={getColor("Quadra_7_-_Lote_18")}
            d="m 5694.2544,3281.885 -1.0218,831.7106 -275.8745,-1.0218 v -829.667 z"
            id="Quadra_7_-_Lote_18"
          />
          <path
            fill={getColor("Quadra_7_-_Lote_19")}
            d="m 5970.1289,3280.8632 v 832.7324 l -276.8963,-1.0218 2.0436,-832.7323 z"
            id="Quadra_7_-_Lote_19"
          />
          <path
            fill={getColor("Quadra_7_-_Lote_20")}
            d="m 6244.9817,3279.8415 v 833.7541 l -275.8745,-1.0218 1.0217,-831.7106 z"
            id="Quadra_7_-_lote_20"
          />
          <path
            fill={getColor("Quadra_7_-_Lote_21")}
            d="m 6244.9817,3280.8632 1.0217,832.7324 h 274.8528 l 1.0218,-836.8194 z"
            id="Quadra_7_-_Lote_21"
          />
          <path
            fill={getColor("Quadra_7_-_Lote_22")}
            d="m 6520.8562,3278.8197 v 835.7976 l 277.918,-2.0435 -1.0217,-835.7976 z"
            id="Quadra_7_-_Lote_22"
          />
          <path
            fill={getColor("Quadra_7_-_Lote_23")}
            d="m 6795.7564,3275.7771 1.4449,838.0903 h 275.9918 v -839.5353 z"
            id="Quadra_7_-_Lote_23"
          />
          <path
            fill={getColor("Quadra_7_-_Lote_24")}
            d="m 7073.1931,3271.4421 1.445,842.4253 274.5468,-1.445 v -839.5353 z"
            id="Quadra_7_-_Lote_24"
          />
          <path
            fill={getColor("Quadra_7_-_Lote_25")}
            d="m 7350.6299,3277.2221 -1.445,836.6453 277.4368,-1.445 v -843.8702 z"
            id="Quadra_7_-_Lote_25"
          />
          <path
            fill={getColor("Quadra_7_-_Lote_26")}
            d="m 7899.7236,3269.9972 1.445,843.8702 h -275.9918 l 1.4449,-846.7602 z"
            id="Quadra_7_-_Lote_26"
          />
        </g>

        <g id="Quadra_8" transform="translate(-1.1190106,-1964.0017)">
          <path
            fill={getColor("Quadra_8_-_Lote_1")}
            d="m 450.37082,4112.7421 -1.38151,839.9554 276.30112,-4.1445 v -838.5739 z"
            id="Quadra_8_-_Lote_1"
          />
          <path
            fill={getColor("Quadra_8_-_Lote_2")}
            d="m 726.50061,4114.1368 2.88997,840.9803 274.54682,-2.89 -1.445,-838.0903 z"
            id="Quadra_8_-_Lote_2"
          />
          <path
            fill={getColor("Quadra_8_-_Lote_3")}
            d="m 1000.21,4109.9791 1.3815,839.9554 277.6827,-2.763 -2.763,-834.4294 z"
            id="Quadra_8_-_Lote_3"
          />
          <path
            fill={getColor("Quadra_8_-_Lote_4")}
            d="m 1277.8927,4112.7421 v 837.1924 h 277.6826 v -838.5739 z"
            id="Quadra_8_-_Lote_4"
          />
          <path
            fill={getColor("Quadra_8_-_Lote_5")}
            d="m 1552.8123,4112.7421 2.763,844.0999 h 276.3011 l -2.763,-845.4814 z"
            id="Quadra_8_-_Lote_5"
          />
          <path
            fill={getColor("Quadra_8_-_Lote_6")}
            d="m 1829.1134,4112.7421 1.3815,837.1924 274.9196,-2.763 v -834.4294 z"
            id="Quadra_8_-_Lote_6"
          />
          <path
            fill={getColor("Quadra_8_-_Lote_7")}
            d="m 2105.4145,4112.7421 v 837.1924 l 276.3011,-2.763 v -835.8109 z"
            id="Quadra_8_-_Lote_7"
          />
          <path
            fill={getColor("Quadra_8_-_Lote_8")}
            d="m 2381.7156,4111.3606 v 838.5739 l 276.3011,-2.763 v -835.8109 z"
            id="Quadra_8_-_Lote_8"
          />
          <path
            fill={getColor("Quadra_8_-_Lote_9")}
            d="m 2656.6352,4111.3606 1.3815,841.3369 277.6827,1.3815 -1.3816,-844.0999 z"
            id="Quadra_8_-_Lote_9"
          />
          <path
            fill={getColor("Quadra_8_-_Lote_10")}
            d="m 2935.6065,4668.5937 835.7976,-1.0217 -1.0218,277.918 -834.7758,-1.0217 z"
            id="Quadra_8_-_Lote_10"
          />
          <path
            fill={getColor("Quadra_8_-_Lote_11")}
            d="m 2935.6994,4392.4247 852.3889,-1.3815 v 277.6826 l -855.152,-1.3815 z"
            id="Quadra_8_-_Lote_11"
          />
          <path
            fill={getColor("Quadra_8_-_Lote_12")}
            d="m 2932.9363,4112.7421 v 276.3011 h 841.3369 l 2.7631,-280.4456 z"
            id="Quadra_8_-_Lote_12"
          />
          <path
            fill={getColor("Quadra_8_-_Lote_13")}
            d="m 2936.6282,3837.9049 -2.0435,276.8963 h 848.0587 l 1.0218,-276.8963 z"
            id="Quadra_8_-_Lote_13"
          />
          <path
            fill={getColor("Quadra_8_-_Lote_14")}
            d="m 2935.6065,3563.0521 832.7323,-1.0217 v 276.8963 l -832.7323,-1.0218 z"
            id="Quadra_8_-_Lote_14"
          />
          <path
            fill={getColor("Quadra_8_-_Lote_15")}
            d="m 2935.1097,3286.7163 832.7323,-1.0217 v 276.8963 l -832.7323,-1.0218 z"
            id="Quadra_8_-_Lote_15"
          />
          <path
            fill={getColor("Quadra_8_-_Lote_16")}
            d="m 2659.3982,3267.2607 -1.3815,846.8629 h 277.6827 l -2.7631,-844.0999 z"
            id="Quadra_8_-_Lote_16"
          />
          <path
            fill={getColor("Quadra_8_-_Lote_17")}
            d="m 2381.7156,3272.7867 v 842.7184 l 277.6826,-1.3815 -1.3815,-844.0999 z"
            id="Quadra_8_-_Lote_17"
          />
          <path
            fill={getColor("Quadra_8_-_Lote_18")}
            d="m 2104.033,3271.4052 1.3815,844.0999 277.6826,-2.763 -1.3815,-844.0999 z"
            id="Quadra_8_-_Lote_18"
          />
          <path
            fill={getColor("Quadra_8_-_Lote_19")}
            d="m 1829.1134,3271.4052 v 841.3369 h 276.3011 v -846.8629 z"
            id="Quadra_6_-_Lote_19-6"
          />
          <path
            fill={getColor("Quadra_8_-_Lote_20")}
            d="m 1552.8123,3268.6422 1.3815,846.8629 276.3011,-1.3815 v -845.4814 z"
            id="Quadra_8_-_Lote_20"
          />
          <path
            fill={getColor("Quadra_8_-_Lote_21")}
            d="m 1277.8927,3272.7867 v 842.7184 l 276.3011,-1.3815 -1.3815,-837.1924 z"
            id="Quadra_8_-_Lote_21"
          />
          <path
            fill={getColor("Quadra_8_-_Lote_22")}
            d="m 1001.5915,3268.6422 v 845.4814 l 277.6827,-1.3815 -1.3815,-842.7184 z"
            id="Quadra_8_-_Lote_22"
          />
          <path
            fill={getColor("Quadra_8_-_Lote_23")}
            d="m 726.67193,3270.0237 -1.3815,844.0999 277.68257,-1.3815 -1.3815,-844.0999 z"
            id="Quadra_8_-_Lote_23"
          />
          <path
            fill={getColor("Quadra_8_-_Lote_24")}
            d="m 448.98931,3267.2607 1.38151,848.2444 276.30111,-2.763 v -841.3369 z"
            id="Quadra_8_-_Lote_24"
          />
        </g>

        <g id="Quadra_9" transform="translate(1103.279,-1963.3721)">
          <path
            fill={getColor("Quadra_9_-_Lote_1")}
            d="m 6521.2095,4112.4224 v 843.8702 l 275.9918,2.89 1.445,-846.7602 z"
            id="Quadra_9_-_Lote_1"
          />
          <path
            fill={getColor("Quadra_9_-_Lote_2")}
            d="m 6246.6627,4112.4224 -2.89,845.3152 278.8818,-1.445 v -843.8702 z"
            id="Quadra_9_-_Lote_2"
          />
          <path
            fill={getColor("Quadra_9_-_Lote_3")}
            d="m 5967.7809,4113.8674 2.89,836.6453 274.5468,2.89 1.445,-840.9803 z"
            id="Quadra_9_-_Lote_3"
          />
          <path
            fill={getColor("Quadra_9_-_Lote_4")}
            d="m 5693.2341,4113.8674 2.89,838.0903 h 271.6568 l 1.445,-840.9803 z"
            id="Quadra_9_-_Lote_4"
          />
          <path
            fill={getColor("Quadra_9_-_Lote_5")}
            d="m 5415.7973,4112.4224 2.89,840.9803 275.9918,-1.445 v -839.5353 z"
            id="Quadra_9_-_Lote_5"
          />
          <path
            fill={getColor("Quadra_9_-_Lote_6")}
            d="m 5141.2505,4112.4224 v 839.5353 h 275.9918 v -840.9803 z"
            id="Quadra_9_-_Lote_6"
          />
          <path
            fill={getColor("Quadra_9_-_Lote_7")}
            d="m 4311.8301,4665.851 829.4204,1.445 v 280.3267 l -833.7554,-2.8899 z"
            id="Quadra_9_-_Lote_7"
          />
          <path
            fill={getColor("Quadra_9_-_Lote_8")}
            d="m 4307.4951,4389.8592 h 835.2004 v 275.9918 h -848.2052 z"
            id="Quadra_9_-_Lote_8"
          />
          <path
            fill={getColor("Quadra_9_-_Lote_9")}
            d="m 5141.2505,4113.8674 h -839.5353 l 1.445,278.8818 838.0903,-2.89 z"
            id="Quadra_9_-_Lote_9"
          />
          <path
            fill={getColor("Quadra_9_-_Lote_10")}
            d="m 5141.4836,3835.6776 -833.7541,1.0217 2.0435,276.8963 h 831.7106 z"
            id="Quadra_9_-_Lote_10"
          />
          <path
            fill={getColor("Quadra_9_-_Lote_11")}
            d="m 5141.4836,3559.803 h -837.8411 l 4.087,278.9398 836.8194,-3.0652 z"
            id="Quadra_9_-_Lote_11"
          />
          <path
            fill={getColor("Quadra_9_-_Lote_12")}
            d="m 5141.2505,3283.7245 -833.7553,0.7225 5.0574,277.4368 829.4204,-2.1675 z"
            id="Quadra_9_-_Lote_12"
          />
          <path
            fill={getColor("Quadra_9_-_Lote_13")}
            d="m 5417.3581,3283.9285 v 828.6453 h -276.8962 l 2.0435,-834.7758 z"
            id="Quadra_9_-_Lote_13"
          />
          <path
            fill={getColor("Quadra_9_-_Lote_14")}
            d="m 5694.2544,3281.885 -1.0218,831.7106 -275.8745,-1.0218 v -829.667 z"
            id="Quadra_9_-_Lote_14"
          />
          <path
            fill={getColor("Quadra_9_-_Lote_15")}
            d="m 5970.1289,3280.8632 v 832.7324 l -276.8963,-1.0218 2.0436,-832.7323 z"
            id="Quadra_9_-_Lote_15"
          />
          <path
            fill={getColor("Quadra_9_-_Lote_16")}
            d="m 6244.9817,3279.8415 v 833.7541 l -275.8745,-1.0218 1.0217,-831.7106 z"
            id="Quadra_9_-_Lote_16"
          />
          <path
            fill={getColor("Quadra_9_-_Lote_17")}
            d="m 6244.9817,3280.8632 1.0217,832.7324 h 274.8528 l 1.0218,-836.8194 z"
            id="Quadra_9_-_Lote_17"
          />
          <path
            fill={getColor("Quadra_9_-_Lote_18")}
            d="m 6520.8562,3278.8197 v 835.7976 l 277.918,-2.0435 -1.0217,-835.7976 z"
            id="Quadra_9_-_Lote_18"
          />
        </g>

        <g id="Quadra-10">
          <path
            fill={getColor("Quadra_10_-_Lote_1")}
            d="m 3499.7495,505.74415 h 275.9918 v 523.08395 l -277.4368,-1.445 z"
            id="Quadra_10_-_Lote_1"
          />
          <path
            fill={getColor("Quadra_10_-_Lote_2")}
            d="m 3498.3045,219.63746 1.445,806.30064 -277.4368,-1.445 1.445,-806.30063 z"
            id="Quadra_10_-_Lote_2"
          />
          <path
            fill={getColor("Quadra_10_-_Lote_3")}
            d="m 3221.2009,222.88098 1.445,806.30062 -277.4368,-1.445 1.445,-806.30061 z"
            id="Quadra_10_-_Lote_3"
          />
          <path
            fill={getColor("Quadra_10_-_Lote_4")}
            d="m 2946.7223,225.40316 1.445,806.30064 -277.4368,-1.445 1.445,-806.30063 z"
            id="Quadra_10_-_Lote_4"
          />
          <path
            fill={getColor("Quadra_10_-_Lote_5")}
            d="m 2670.7223,225.40316 1.445,806.30064 -277.4368,-1.445 1.445,-806.30063 z"
            id="Quadra_10_-_Lote_5"
          />
          <path
            fill={getColor("Quadra_10_-_Lote_6")}
            d="m 2395.3298,223.35965 1.445,806.30065 -277.4368,-1.445 1.445,-806.30064 z"
            id="Quadra_10_-_Lote_6"
          />
          <path
            fill={getColor("Quadra_10_-_Lote_7")}
            d="m 2121.1122,221.31614 1.445,806.30066 -277.4368,-1.445 1.445,-806.30065 z"
            id="Quadra_10_-_Lote_7"
          />
          <path
            fill={getColor("Quadra_10_-_Lote_8")}
            d="m 1843.1122,221.31614 1.445,806.30066 -277.4368,-1.445 1.445,-806.30065 z"
            id="Quadra_10_-_Lote_8"
          />
          <path
            fill={getColor("Quadra_10_-_Lote_9")}
            d="m 1569.4569,221.31614 1.445,806.30066 -277.4368,-1.445 1.445,-806.30065 z"
            id="Quadra_10_-_Lote_9"
          />
          <path
            fill={getColor("Quadra_10_-_Lote_10")}
            d="m 1291.4569,221.31614 1.445,806.30066 -277.4368,-1.445 1.445,-806.30065 z"
            id="Quadra_10_-_Lote_10"
          />
          <path
            fill={getColor("Quadra_10_-_Lote_11")}
            d="m 1017.1523,221.31614 1.445,806.30066 -277.4368,-1.445 1.445,-806.30065 z"
            id="Quadra_10_-_Lote_11"
          />
          <path
            fill={getColor("Quadra_10_-_Lote_12")}
            d="m 739.34953,223.31614 1.50886,806.30066 -289.69789,-1.445 1.50886,-806.30065 z"
            id="Quadra_10_-_Lote_12"
          />
        </g>

        <g id="Quadra-11" transform="translate(3833.8626,8.8920283)">
          <path
            fill={getColor("Quadra_11_-_Lote_1")}
            d="m 739.34953,223.31614 1.50886,806.30066 -289.69789,-1.445 1.50886,-806.30065 z"
            id="Quadra_11_-_Lote_1"
          />
          <path
            fill={getColor("Quadra_11_-_Lote_2")}
            d="m 1017.1523,221.31614 1.445,806.30066 -277.4368,-1.445 1.445,-806.30065 z"
            id="Quadra_11_-_Lote_2"
          />
          <path
            fill={getColor("Quadra_11_-_Lote_3")}
            d="m 1291.4569,221.31614 1.445,806.30066 -277.4368,-1.445 1.445,-806.30065 z"
            id="Quadra_11_-_Lote_3"
          />
          <path
            fill={getColor("Quadra_11_-_Lote_4")}
            d="m 1569.4569,221.31614 1.445,806.30066 -277.4368,-1.445 1.445,-806.30065 z"
            id="Quadra_11_-_Lote_4"
          />
          <path
            fill={getColor("Quadra_11_-_Lote_5")}
            d="m 1843.1122,221.31614 1.445,806.30066 -277.4368,-1.445 1.445,-806.30065 z"
            id="Quadra_11_-_Lote_5"
          />
          <path
            fill={getColor("Quadra_11_-_Lote_6")}
            d="m 2121.1122,221.31614 1.445,806.30066 -277.4368,-1.445 1.445,-806.30065 z"
            id="Quadra_11_-_Lote_6"
          />
          <path
            fill={getColor("Quadra_11_-_Lote_7")}
            d="m 2395.3298,223.35965 1.445,806.30065 -277.4368,-1.445 1.445,-806.30064 z"
            id="Quadra_11_-_Lote_7"
          />
          <path
            fill={getColor("Quadra_11_-_Lote_8")}
            d="m 2670.7223,225.40316 1.445,806.30064 -277.4368,-1.445 1.445,-806.30063 z"
            id="Quadra_11_-_Lote_8"
          />
          <path
            fill={getColor("Quadra_11_-_Lote_9")}
            d="m 2946.7223,225.40316 1.445,806.30064 -277.4368,-1.445 1.445,-806.30063 z"
            id="Quadra_11_-_Lote_9"
          />
          <path
            fill={getColor("Quadra_11_-_Lote_10")}
            d="m 3221.2009,222.88098 1.445,806.30062 -277.4368,-1.445 1.445,-806.30061 z"
            id="Quadra_11_-_Lote_10"
          />
          <path
            fill={getColor("Quadra_11_-_Lote_11")}
            d="m 3498.3045,219.63746 1.445,806.30064 -277.4368,-1.445 1.445,-806.30063 z"
            id="Quadra_11_-_Lote_11"
          />
          <path
            fill={getColor("Quadra_11_-_Lote_12")}
            d="m 3501.7495,219.63746 h 275.9918 v 809.19064 l -277.4368,-2.2354 z"
            id="Quadra_11_-_Lote_12"
          />
          <path
            fill={getColor("Quadra_11_-_Lote_13")}
            d="m 3775.4193,219.41533 h 294.7766 v 790.40587 l -294.7766,1.445 z"
            id="Quadra_11_-_Lote_13"
          />
        </g>
      </g>
    </svg>
  );
}
