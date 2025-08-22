const db = require('../db');   // <-- add this line

exports.getProfile = async (req, res) => {
  try {
    const { associate_id, employee_name } = req.params || req.query || req.body;
    const targetAssociateId = associate_id || employee_name || 50;

    const profileQuery = `
      SELECT 
          MEM.associate_id,
          MEM.employee_name,
          MEM.profile_image_url,
          MGR.employee_name AS direct_manager_name,
          MD.name AS employee_designation
      FROM m_employee_master MEM
      LEFT JOIN t_e360_managerial_details TMD 
          ON MEM.associate_id = TMD.associate_id
          AND TMD.end_date >= CURRENT_DATE
          AND TMD.is_active = 1
      LEFT JOIN m_employee_master MGR 
          ON TMD.direct_manager = MGR.oid
      LEFT JOIN m_designation MD 
          ON MEM.desgn_code = MD.code
      WHERE (MEM.associate_id = ? OR MEM.employee_name = ?)
        AND MEM.is_active = 1
    `;

    const [rows] = await db.execute(profileQuery, [targetAssociateId, targetAssociateId]);

    if (rows.length === 0) {
      return res.status(404).json({ success: false, message: "Employee not found" });
    }

    const employeeData = rows[0];

    const userData = {
      profilePicture: employeeData.profile_image_url || "/assets/profile_picture.png",
      name: employeeData.employee_name,
      aid: employeeData.associate_id,
      designation: employeeData.employee_designation || "N/A",
      manager: employeeData.direct_manager_name || "No Manager Assigned",
      annualContribution: 100000,
      annualEligibleReferral: 200000,
      balanceEligibleReferral: 20000,
      myReferrals: 0
    };

    res.status(200).json(userData);

  } catch (error) {
    console.error("Error fetching profile data:", error);
    res.status(500).json({ success: false, message: "Internal server error", error: error.message });
  }
};
