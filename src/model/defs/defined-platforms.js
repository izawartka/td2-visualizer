import Vector3 from "../vector3.js";

/*
NOTE: VSCode regex for replacing vector3 values in text:
\{\s*"x"\s*:\s*(-?\d+(?:\.\d+)?),\s*"y"\s*:\s*(-?\d+(?:\.\d+)?),\s*"z"\s*:\s*(-?\d+(?:\.\d+)?)\s*\}(,?)\n
replace to
new Vector3($1, $2, $3)$4\n
*/

const DefinedPlatforms = {
    "peron_v1-1": {
        "center": new Vector3(3.585, 0.056, 0.0),
        "size": new Vector3(4.002, 0.65, 10.035)
    },
    "peron_v1-2": {
        "alias": "peron_v1-1"
    },
    "peron_v2": {
        "alias": "peron_v1-1"
    },
    "peron_v3-1": {
        "alias": "peron_v1-1"
    },
    "peron_v3-2": {
        "alias": "peron_v1-1"
    },
    "peron_v4": {
        "alias": "peron_v1-1"
    },
    "peron_v5-1": {
        "center": new Vector3(3.675, 0.312, 0.0),
        "size": new Vector3(4.002, 1.301, 10.035)
    },
    "peron_v5-2": {
        "alias": "peron_v5-1"
    },
    "peron_zm_200m_v1_new": {
        "center": new Vector3(-4.175, -0.06, 0.0),
        "size": new Vector3(5.0, 1.76, 200.0)
    },
    "peron_zm_200m_v1_normal": {
        "alias": "peron_zm_200m_v1_new"
    },
    "peron_zm_200m_v2_new": {
        "alias": "peron_zm_200m_v1_new"
    },
    "peron_zm_200m_v2_normal": {
        "alias": "peron_zm_200m_v1_new"
    },
    "peron_zm_200m_v3_new": {
        "alias": "peron_zm_200m_v1_new"
    },
    "peron_zm_200m_v3_normal": {
        "alias": "peron_zm_200m_v1_new"
    },
    "peron_zm_200m_v4_new": {
        "alias": "peron_zm_200m_v1_new"
    },
    "peron_zm_200m_v4_normal": {
        "alias": "peron_zm_200m_v1_new"
    },
    "peron_zm_200m_v5_new": {
        "alias": "peron_zm_200m_v1_new"
    },
    "peron_zm_200m_v5_normal": {
        "alias": "peron_zm_200m_v1_new"
    },
    "peron_zm_200m_v6_new": {
        "alias": "peron_zm_200m_v1_new"
    },
    "peron_zm_200m_v6_normal": {
        "alias": "peron_zm_200m_v1_new"
    },
    "peron_zm_200m_v7_new": {
        "alias": "peron_zm_200m_v1_new"
    },
    "peron_zm_200m_v7_normal": {
        "alias": "peron_zm_200m_v1_new"
    },
    "peron_zm_250m_v1_new": {
        "center": new Vector3(-4.175, -0.06, 0.0),
        "size": new Vector3(5.0, 1.76, 250.0)
    },
    "peron_zm_250m_v1_normal": {
        "alias": "peron_zm_250m_v1_new"
    },
    "peron_zm_250m_v2_new": {
        "alias": "peron_zm_250m_v1_new"
    },
    "peron_zm_250m_v2_normal": {
        "alias": "peron_zm_250m_v1_new"
    },
    "peron_zm_250m_v3_new": {
        "alias": "peron_zm_250m_v1_new"
    },
    "peron_zm_250m_v3_normal": {
        "alias": "peron_zm_250m_v1_new"
    },
    "peron_zm_250m_v4_new": {
        "alias": "peron_zm_250m_v1_new"
    },
    "peron_zm_250m_v4_normal": {
        "alias": "peron_zm_250m_v1_new"
    },
    "peron_zm_250m_v5_new": {
        "alias": "peron_zm_250m_v1_new"
    },
    "peron_zm_250m_v5_normal": {
        "alias": "peron_zm_250m_v1_new"
    },
    "peron_zm_250m_v6_new": {
        "alias": "peron_zm_250m_v1_new"
    },
    "peron_zm_250m_v6_normal": {
        "alias": "peron_zm_250m_v1_new"
    },
    "peron_zm_250m_v7_new": {
        "alias": "peron_zm_250m_v1_new"
    },
    "peron_zm_250m_v7_normal": {
        "alias": "peron_zm_250m_v1_new"
    },
    "peron_zm_300m_v1_new": {
        "center": new Vector3(-4.175, -0.06, 0.0),
        "size": new Vector3(5.0, 1.76, 300.0)
    },
    "peron_zm_300m_v1_normal": {
        "alias": "peron_zm_300m_v1_new"
    },
    "peron_zm_300m_v2_new": {
        "alias": "peron_zm_300m_v1_new"
    },
    "peron_zm_300m_v2_normal": {
        "alias": "peron_zm_300m_v1_new"
    },
    "peron_zm_300m_v3_new": {
        "alias": "peron_zm_300m_v1_new"
    },
    "peron_zm_300m_v3_normal": {
        "alias": "peron_zm_300m_v1_new"
    },
    "peron_zm_300m_v4_new": {
        "alias": "peron_zm_300m_v1_new"
    },
    "peron_zm_300m_v4_normal": {
        "alias": "peron_zm_300m_v1_new"
    },
    "peron_zm_300m_v5_new": {
        "alias": "peron_zm_300m_v1_new"
    },
    "peron_zm_300m_v5_normal": {
        "alias": "peron_zm_300m_v1_new"
    },
    "peron_zm_300m_v6_new": {
        "alias": "peron_zm_300m_v1_new"
    },
    "peron_zm_300m_v6_normal": {
        "alias": "peron_zm_300m_v1_new"
    },
    "peron_zm_300m_v7_new": {
        "alias": "peron_zm_300m_v1_new"
    },
    "peron_zm_300m_v7_normal": {
        "alias": "peron_zm_300m_v1_new"
    },
    "peron_zm_30m_middle_v1_new": {
        "center": new Vector3(-5.425, -0.06, 0.0),
        "size": new Vector3(2.5, 1.76, 30.0)
    },
    "peron_zm_30m_middle_v1_normal": {
        "alias": "peron_zm_30m_middle_v1_new"
    },
    "peron_zm_30m_middle_v2_new": {
        "alias": "peron_zm_30m_middle_v1_new"
    },
    "peron_zm_30m_middle_v2_normal": {
        "alias": "peron_zm_30m_middle_v1_new"
    },
    "peron_zm_30m_middle_v3_new": {
        "alias": "peron_zm_30m_middle_v1_new"
    },
    "peron_zm_30m_middle_v3_normal": {
        "alias": "peron_zm_30m_middle_v1_new"
    },
    "peron_zm_30m_middle_v4_new": {
        "alias": "peron_zm_30m_middle_v1_new"
    },
    "peron_zm_30m_middle_v4_normal": {
        "alias": "peron_zm_30m_middle_v1_new"
    },
    "peron_zm_30m_middle_v5_new": {
        "alias": "peron_zm_30m_middle_v1_new"
    },
    "peron_zm_30m_middle_v5_normal": {
        "alias": "peron_zm_30m_middle_v1_new"
    },
    "peron_zm_30m_middle_v6_new": {
        "alias": "peron_zm_30m_middle_v1_new"
    },
    "peron_zm_30m_middle_v6_normal": {
        "alias": "peron_zm_30m_middle_v1_new"
    },
    "peron_zm_30m_middle_v7_new": {
        "alias": "peron_zm_30m_middle_v1_new"
    },
    "peron_zm_30m_middle_v7_normal": {
        "alias": "peron_zm_30m_middle_v1_new"
    },
    "peron_zm_30m_thin_v1_new": {
        "center": new Vector3(-3.175, -0.06, 0.0),
        "size": new Vector3(3.0, 1.76, 30.0)
    },
    "peron_zm_30m_thin_v1_normal": {
        "alias": "peron_zm_30m_thin_v1_new"
    },
    "peron_zm_30m_thin_v2_new": {
        "alias": "peron_zm_30m_thin_v1_new"
    },
    "peron_zm_30m_thin_v2_normal": {
        "alias": "peron_zm_30m_thin_v1_new"
    },
    "peron_zm_30m_thin_v3_new": {
        "alias": "peron_zm_30m_thin_v1_new"
    },
    "peron_zm_30m_thin_v3_normal": {
        "alias": "peron_zm_30m_thin_v1_new"
    },
    "peron_zm_30m_thin_v4_new": {
        "alias": "peron_zm_30m_thin_v1_new"
    },
    "peron_zm_30m_thin_v4_normal": {
        "alias": "peron_zm_30m_thin_v1_new"
    },
    "peron_zm_30m_thin_v5_new": {
        "alias": "peron_zm_30m_thin_v1_new"
    },
    "peron_zm_30m_thin_v5_normal": {
        "alias": "peron_zm_30m_thin_v1_new"
    },
    "peron_zm_30m_thin_v6_new": {
        "alias": "peron_zm_30m_thin_v1_new"
    },
    "peron_zm_30m_thin_v6_normal": {
        "alias": "peron_zm_30m_thin_v1_new"
    },
    "peron_zm_30m_thin_v7_new": {
        "alias": "peron_zm_30m_thin_v1_new"
    },
    "peron_zm_30m_thin_v7_normal": {
        "alias": "peron_zm_30m_thin_v1_new"
    },
    "peron_zm_30m_v1_new": {
        "center": new Vector3(-4.175, -0.06, 0.0),
        "size": new Vector3(5.0, 1.76, 30.0)
    },
    "peron_zm_30m_v1_normal": {
        "alias": "peron_zm_30m_v1_new"
    },
    "peron_zm_30m_v2_new": {
        "alias": "peron_zm_30m_v1_new"
    },
    "peron_zm_30m_v2_normal": {
        "alias": "peron_zm_30m_v1_new"
    },
    "peron_zm_30m_v3_new": {
        "alias": "peron_zm_30m_v1_new"
    },
    "peron_zm_30m_v3_normal": {
        "alias": "peron_zm_30m_v1_new"
    },
    "peron_zm_30m_v4_new": {
        "alias": "peron_zm_30m_v1_new"
    },
    "peron_zm_30m_v4_normal": {
        "alias": "peron_zm_30m_v1_new"
    },
    "peron_zm_30m_v5_new": {
        "alias": "peron_zm_30m_v1_new"
    },
    "peron_zm_30m_v5_normal": {
        "alias": "peron_zm_30m_v1_new"
    },
    "peron_zm_30m_v6_new": {
        "alias": "peron_zm_30m_v1_new"
    },
    "peron_zm_30m_v6_normal": {
        "alias": "peron_zm_30m_v1_new"
    },
    "peron_zm_30m_v7_new": {
        "alias": "peron_zm_30m_v1_new"
    },
    "peron_zm_30m_v7_normal": {
        "alias": "peron_zm_30m_v1_new"
    },
    "peron_zm_6m_middle_v1_new": {
        "center": new Vector3(-5.425, -0.06, 0.0),
        "size": new Vector3(2.5, 1.76, 6.0)
    },
    "peron_zm_6m_middle_v1_normal": {
        "alias": "peron_zm_6m_middle_v1_new"
    },
    "peron_zm_6m_middle_v2_new": {
        "alias": "peron_zm_6m_middle_v1_new"
    },
    "peron_zm_6m_middle_v2_normal": {
        "alias": "peron_zm_6m_middle_v1_new"
    },
    "peron_zm_6m_middle_v3_new": {
        "alias": "peron_zm_6m_middle_v1_new"
    },
    "peron_zm_6m_middle_v3_normal": {
        "alias": "peron_zm_6m_middle_v1_new"
    },
    "peron_zm_6m_middle_v4_new": {
        "alias": "peron_zm_6m_middle_v1_new"
    },
    "peron_zm_6m_middle_v4_normal": {
        "alias": "peron_zm_6m_middle_v1_new"
    },
    "peron_zm_6m_middle_v5_new": {
        "alias": "peron_zm_6m_middle_v1_new"
    },
    "peron_zm_6m_middle_v5_normal": {
        "alias": "peron_zm_6m_middle_v1_new"
    },
    "peron_zm_6m_middle_v6_new": {
        "alias": "peron_zm_6m_middle_v1_new"
    },
    "peron_zm_6m_middle_v6_normal": {
        "alias": "peron_zm_6m_middle_v1_new"
    },
    "peron_zm_6m_middle_v7_new": {
        "alias": "peron_zm_6m_middle_v1_new"
    },
    "peron_zm_6m_middle_v7_normal": {
        "alias": "peron_zm_6m_middle_v1_new"
    },
    "peron_zm_6m_thin_v1_new": {
        "center": new Vector3(-3.175, -0.06, 0.0),
        "size": new Vector3(3.0, 1.76, 6.0)
    },
    "peron_zm_6m_thin_v1_normal": {
        "alias": "peron_zm_6m_thin_v1_new"
    },
    "peron_zm_6m_thin_v2_new": {
        "alias": "peron_zm_6m_thin_v1_new"
    },
    "peron_zm_6m_thin_v2_normal": {
        "alias": "peron_zm_6m_thin_v1_new"
    },
    "peron_zm_6m_thin_v3_new": {
        "alias": "peron_zm_6m_thin_v1_new"
    },
    "peron_zm_6m_thin_v3_normal": {
        "alias": "peron_zm_6m_thin_v1_new"
    },
    "peron_zm_6m_thin_v4_new": {
        "alias": "peron_zm_6m_thin_v1_new"
    },
    "peron_zm_6m_thin_v4_normal": {
        "alias": "peron_zm_6m_thin_v1_new"
    },
    "peron_zm_6m_thin_v5_new": {
        "alias": "peron_zm_6m_thin_v1_new"
    },
    "peron_zm_6m_thin_v5_normal": {
        "alias": "peron_zm_6m_thin_v1_new"
    },
    "peron_zm_6m_thin_v6_new": {
        "alias": "peron_zm_6m_thin_v1_new"
    },
    "peron_zm_6m_thin_v6_normal": {
        "alias": "peron_zm_6m_thin_v1_new"
    },
    "peron_zm_6m_thin_v7_new": {
        "alias": "peron_zm_6m_thin_v1_new"
    },
    "peron_zm_6m_thin_v7_normal": {
        "alias": "peron_zm_6m_thin_v1_new"
    },
    "peron_zm_6m_v1_new": {
        "center": new Vector3(-4.175, -0.06, 0.0),
        "size": new Vector3(5.0, 1.76, 6.0)
    },
    "peron_zm_6m_v1_normal": {
        "alias": "peron_zm_6m_v1_new"
    },
    "peron_zm_6m_v2_new": {
        "alias": "peron_zm_6m_v1_new"
    },
    "peron_zm_6m_v2_normal": {
        "alias": "peron_zm_6m_v1_new"
    },
    "peron_zm_6m_v3_new": {
        "alias": "peron_zm_6m_v1_new"
    },
    "peron_zm_6m_v3_normal": {
        "alias": "peron_zm_6m_v1_new"
    },
    "peron_zm_6m_v4_new": {
        "alias": "peron_zm_6m_v1_new"
    },
    "peron_zm_6m_v4_normal": {
        "alias": "peron_zm_6m_v1_new"
    },
    "peron_zm_6m_v5_new": {
        "alias": "peron_zm_6m_v1_new"
    },
    "peron_zm_6m_v5_normal": {
        "alias": "peron_zm_6m_v1_new"
    },
    "peron_zm_6m_v6_new": {
        "alias": "peron_zm_6m_v1_new"
    },
    "peron_zm_6m_v6_normal": {
        "alias": "peron_zm_6m_v1_new"
    },
    "peron_zm_6m_v7_new": {
        "alias": "peron_zm_6m_v1_new"
    },
    "peron_zm_6m_v7_normal": {
        "alias": "peron_zm_6m_v1_new"
    },
    "platform1newsnap": {
        "center": new Vector3(4.58, 0.15, -4.56),
        "size": new Vector3(5.551, 1.0, 10.0)
    },
    "platform1newsnaplong": {
        "center": new Vector3(4.32, 0.15, 10.437),
        "size": new Vector3(5.273, 1.0, 39.995)
    },
    "platform2newsnap": {
        "center": new Vector3(4.58, 0.15, -4.56),
        "size": new Vector3(5.551, 1.0, 10.0)
    },
    "platform2newsnaplong": {
        "center": new Vector3(4.32, 0.15, 10.437),
        "size": new Vector3(5.273, 1.0, 39.995)
    },
    "platform3_snap": {
        "center": new Vector3(2.74, -0.162, 0.0),
        "size": new Vector3(2.0, 0.4, 8.0)
    },
    "platform_2S_8_5m": {
        "center": new Vector3(0.0, 0.3, 2.5),
        "size": new Vector3(8.5, 0.6, 5.0)
    },
    "platform_concrete_3m_1S": {
        "center": new Vector3(0.0, 0.3, 3.0),
        "size": new Vector3(3.0, 0.6, 6.0)
    },
    "platform_concrete_6m_2S": {
        "center": new Vector3(0.0, 0.3, 3.0),
        "size": new Vector3(6.0, 0.6, 6.0)
    },
    "platform_gorzow_wlkp_01": {
        "center": new Vector3(0.0, 0.15, 0.0),
        "size": new Vector3(10.0, 0.3, 2.8)
    },
    "platform_gorzow_wlkp_02": {
        "center": new Vector3(0.0, 0.15, 0.0),
        "size": new Vector3(10.0, 0.3, 2.8)
    },
    "platform_gorzow_wlkp_03": {
        "alias": "platform_gorzow_wlkp_01"
    },
    "platform_gorzow_wlkp_04": {
        "alias": "platform_gorzow_wlkp_01"
    },
    "platform_new_01": {
        "center": new Vector3(-0.2, 0.5, 0.0),
        "size": new Vector3(5.551, 1.0, 10.0)
    },
    "platform_new_02": {
        "center": new Vector3(-0.2, 0.5, 0.0),
        "size": new Vector3(5.551, 1.0, 10.0)
    },
    "platform_new_03": {
        "center": new Vector3(-1.0, 0.5, 0.0),
        "size": new Vector3(5.551, 1.0, 10.0)
    },
    "platform_new_03_snap": {
        "center": new Vector3(4.48, 0.15, -4.56),
        "size": new Vector3(5.551, 1.0, 10.0)
    },
    "platform_new_end_left": {
        "center": new Vector3(-0.128, 0.5, 0.01),
        "size": new Vector3(4.3, 1.0, 10.0)
    },
    "platform_new_end_right": {
        "center": new Vector3(-0.15, 0.5, 0.0),
        "size": new Vector3(4.3, 1.0, 10.0)
    },
    "platform_new_thin_01": {
        "center": new Vector3(-1.8, 0.5, 0.0),
        "size": new Vector3(3.551, 1.0, 10.0)
    },
    "platform_new_thin_02": {
        "alias": "platform_new_thin_01"
    },
    "platform_new_thin_03": {
        "center": new Vector3(-2.0, 0.5, 0.0),
        "size": new Vector3(3.551, 1.0, 10.0)
    },
    "platform_new_thin_03_snap": {
        "center": new Vector3(3.48, 0.15, -4.56),
        "size": new Vector3(3.551, 1.0, 10.0)
    },
    "platform_new_two_sides_01": {
        "center": new Vector3(0.0, 0.5, 0.0),
        "size": new Vector3(7.55, 1.0, 10.0)
    },
    "platform_new_two_sides_02": {
        "center": new Vector3(0.0, 0.5, 0.0),
        "size": new Vector3(7.55, 1.0, 10.0)
    },
    "platform_new_two_sides_03": {
        "center": new Vector3(0.0, 0.5, 0.0),
        "size": new Vector3(7.55, 1.0, 10.0)
    },
    "platform_new_two_sides_04": {
        "center": new Vector3(0.0, 0.5, 0.0),
        "size": new Vector3(8.53, 1.0, 10.0)
    },
    "platform_new_two_sides_thin_03": {
        "center": new Vector3(0.0, 0.5, 0.0),
        "size": new Vector3(5.551, 1.0, 10.001)
    },
    "platform_new_wide_03": {
        "center": new Vector3(-0.25, 0.5, 0.0),
        "size": new Vector3(7.05, 1.0, 10.0)
    },
    "platform_new_wide_03_snap": {
        "center": new Vector3(5.23, 0.15, -4.56),
        "size": new Vector3(7.05, 1.0, 10.0)
    },
    "platform_olawa_01": {
        "center": new Vector3(0.0, 0.15, 0.0),
        "size": new Vector3(10.0, 0.3, 5.25)
    },
    "platform_olawa_02": {
        "center": new Vector3(0.0, 0.15, 0.0),
        "size": new Vector3(10.0, 0.3, 2.083)
    },
    "platform_old": {
        "alias": "platform_new_end_right"
    },
    "platform_old_alt_stripe": {
        "center": new Vector3(0.0, 0.5, 0.0),
        "size": new Vector3(4.0, 1.0, 10.0)
    },
    "platform_old_alt_stripe_2": {
        "alias": "platform_old_alt_stripe"
    },
    "platform_old_end_left": {
        "alias": "platform_new_end_right"
    },
    "platform_old_end_right": {
        "alias": "platform_new_end_right"
    },
    "platform_old_no_stripe": {
        "center": new Vector3(-0.15, 0.19, 0.0),
        "size": new Vector3(4.3, 1.0, 10.0)
    },
    "wgt_peron_ursus_pln": {
        "center": new Vector3(0.0, -0.681, 0.0),
        "size": new Vector3(20.046, 2.701, 5.899)
    }
};

export default DefinedPlatforms;
