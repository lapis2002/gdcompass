// ==========================================================================
// Configuration and Data
// ==========================================================================

export const GD_CONFIG = {
    // Animation durations
    ANIMATION_DURATION: 300,
    
    // Step IDs
    STEPS: {
      START: 'step-start',
      GENITALIA: 'step-genitalia',
      SEXUAL_HABIT: 'step-sexual-habit',
      RISK_FACTORS: 'step-risk-factors',
      SYMPTOM_CHECKLIST: 'step-symptom-checklist'
    },
    
    // Result types
    RESULT_TYPES: {
      DIAGNOSED: 'diagnosed',
      NO_SYMPTOMS_RISK_FOUND: 'no-symptoms-risk-found',
      NO_RISK_RESULT: 'no-risk-result',
      SYMPTOM_RESULT: 'symptom-result'
    },
    
    // Flow types
    FLOW_TYPES: {
      HAS_SYMPTOMS: 'has-symptoms',
      NO_SYMPTOMS: 'no-symptoms',
      DIAGNOSED: 'diagnosed'
    }
  };
  
  export const GD_TEST_CODE = {
    HPV: "Xét nghiệm HPV",
    BASIC: "Gói xét nghiệm cơ bản - 5 chỉ số",
    ADVANCE: "Gói xét nghiệm nâng cao - 16 chỉ số",
    SPECIAL: "Gói xét nghiệm chuyên sâu - 21 chỉ số"
  };
  
  
  export const DISEASE_CODE = {
    LAU_CHLAMYDIA: {
      name: "Lậu, Chlamydia",
      description: `<p><strong>Lậu và Chlamydia:</strong> Lậu do vi khuẩn <i>Neisseria gonorrhoeae</i> và Chlamydia do vi khuẩn <i>Chlamydia trachomatis</i> gây ra. Nếu không chẩn đoán và điều trị kịp thời, có thể dẫn đến vô sinh, thai ngoài tử cung, hẹp đường tiểu.</p>`,
    },
    GIANGMAI: {
      name: "Giang mai",
      description: `<p><strong>Giang mai:</strong> Bệnh giang mai do xoắn khuẩn <i>Treponema pallidum</i> gây ra. Nếu không chẩn đoán và điều trị kịp thời, có thể gây ra tổn thương tim, não và hệ thần kinh, thậm chí gây tử vong. Ngoài ra, bệnh giang mai có thể lây truyền từ mẹ sang con.</p>`,
    },
    HSV: {
      name: "HSV",
      description: `<p><strong>HSV:</strong> HSV (Herpes Simplex Virus) là một loại vi-rút phổ biến gây mụn rộp quanh miệng (vi-rút HSV-1 ) và vùng sinh dục ( vi-rút HSV-2). Vi-rút HSV tồn tại suốt đời trong cơ thể và dễ tái phát. Nếu không điều trị, có thể gây ra viêm giác mạc mắt (gây mù) và viêm não. Đặc biệt, trẻ sơ sinh bị nhiễm HSV có nguy cơ tử vong cao.</p>`,
    },
    HIV: {
      name: "HIV", 
      description: `<p><strong>HIV:</strong> HIV là vi-rút gây Hội chứng suy giảm miễn dịch mắc phải (AIDS). Giai đoạn đầu thường chỉ có triệu chứng sốt nhẹ, đau nhức cơ thể như cúm nhưng sau đó tiềm ẩn lâu dài. Nếu không điều trị, HIV sẽ phá hủy hệ miễn dịch, dẫn đến các nhiễm trùng cơ hội, ung thư, và gây tử vong. Điều trị bằng thuốc kháng vi-rút có thể giúp bệnh nhân sống một cuộc đời khỏe mạnh và gần như bình thường.</p>`,
    },
    VIEM_GAN_B: {
      name: "Viêm gan B", 
      description: `<p><strong>Viêm gan B:</strong> HBV (Hepatitis B Virus) là vi-rút gây bệnh viêm gan B. Bệnh thường diễn biến âm thầm, không có triệu chứng rõ ràng. Nếu không điều trị, có thể dẫn đến xơ gan và ung thư gan, thậm chí đe dọa nghiêm trọng đến tính mạng. Hiện nay chúng ta đã có vắc-xin phòng ngừa viêm gan B, vì thế tầm soát và tiêm vaccine sớm là biện pháp phòng ngừa hiệu quả.</p>`,
    },
    VIEM_GAN_C: {
      name: "Viêm gan C",
      description: `<p><strong>Viêm gan C:</strong> HCV (Hepatitis C Virus) là vi-rút gây bệnh viêm gan C. Bệnh diến biến âm thầm và thường được chẩn đoán muộn. Nếu không điều trị, có thể dẫn đến xơ gan, suy gan và ung thư gan. Dù chưa có vắc-xin phòng ngừa, tuy nhiên bệnh có thể được trị khỏi hoàn toàn.</p>`
    },
    SUIMAOGA: {
      name: "Sùi mào gà",
      description: `<p><strong>Sùi mào gà:</strong> HPV (Human Papillomavirus) là vi-rút lây truyền qua đường tình dục phổ biến, có thể gây sùi mào gà ở cơ quan sinh dục, hậu môn, miệng và lưỡi. Nếu không điều trị, một số chủng HPV có thể gây ung thư cổ tử cung, dương vật, hậu môn và hầu họng. Hiện nay chúng ta đã có vắc-xin phòng ngừa HPV, vì thế tầm soát và tiêm vaccine sớm là biện pháp phòng ngừa hiệu quả.</p>`, 
    }
  
  }
  
  // Symptoms data with consistent structure
  export const GD_SYMPTOMS_DATA = [
    { 
      id: "s1", 
      text: "Ngứa vùng sinh dục (âm đạo, dương vật, hậu môn)", 
      risk: [DISEASE_CODE.LAU_CHLAMYDIA.name], 
      tests: [GD_TEST_CODE.SPECIAL, GD_TEST_CODE.ADVANCE]
    },
    { 
      id: "s2", 
      text: "Dịch tiết bất thường từ dương vật hoặc âm đạo hoặc hậu môn", 
      risk: [DISEASE_CODE.LAU_CHLAMYDIA.name], 
      tests: [GD_TEST_CODE.SPECIAL, GD_TEST_CODE.ADVANCE] 
    },
    { 
      id: "s3", 
      text: "Tiểu buốt, tiểu gắt hoặc cảm giác nóng rát khi đi tiểu", 
      risk: [DISEASE_CODE.LAU_CHLAMYDIA.name], 
      tests: [GD_TEST_CODE.SPECIAL, GD_TEST_CODE.ADVANCE] 
    },
    { 
      id: "s4", 
      text: "Đau hoặc chảy máu khi quan hệ tình dục", 
      risk: [DISEASE_CODE.LAU_CHLAMYDIA.name], 
      tests: [GD_TEST_CODE.SPECIAL, GD_TEST_CODE.ADVANCE]
    },
    { 
      id: "s5", 
      text: "Xuất hiện vết loét hoặc mụn nước quanh cơ quan sinh dục, hậu môn, miệng, hoặc lưỡi.", 
      // risk: "Giang mai, HSV",
      risk: [DISEASE_CODE.GIANGMAI.name, DISEASE_CODE.HSV.name], 
      tests: [GD_TEST_CODE.SPECIAL, GD_TEST_CODE.ADVANCE]
    },
    { 
      id: "s6", 
      text: "Xuất hiện nốt sùi hoặc mụn cóc quanh cơ quan sinh dục, hậu môn, miệng, hoặc lưỡi.", 
      // risk: "Sùi mào gà", 
      risk: [DISEASE_CODE.SUIMAOGA.name],
      tests: [[GD_TEST_CODE.HPV, GD_TEST_CODE.ADVANCE], [GD_TEST_CODE.HPV, GD_TEST_CODE.BASIC]]
    },
    { 
      id: "s7", 
      text: "Sưng đau tinh hoàn, bìu", 
      // risk: "Lậu, Chlamydia", 
      risk: [DISEASE_CODE.LAU_CHLAMYDIA.name],
      tests: [GD_TEST_CODE.SPECIAL, GD_TEST_CODE.ADVANCE]
    },
    { 
      id: "s8", 
      text: "Đau vùng bụng từ rốn trở xuống (đau bụng dưới)", 
      // risk: "Lậu, Chlamydia", 
      risk: [DISEASE_CODE.LAU_CHLAMYDIA.name],
      tests: [GD_TEST_CODE.SPECIAL, GD_TEST_CODE.ADVANCE]
    },
    { 
      id: "s9", 
      text: "Đau rát họng, viêm họng hoặc ho kéo dài dai dẳng", 
      // risk: "Lậu, Chlamydia", 
      risk: [DISEASE_CODE.LAU_CHLAMYDIA.name],
      tests: [GD_TEST_CODE.SPECIAL, GD_TEST_CODE.ADVANCE]
    },
    { 
      id: "s10", 
      text: "Sốt nhẹ, mệt mỏi, đau nhức cơ thể", 
      risk: "HSV, HIV, Viêm gan B, Viêm gan C, Giang mai", 
      risk: [DISEASE_CODE.HSV.name, DISEASE_CODE.HIV.name, DISEASE_CODE.VIEM_GAN_B.name, DISEASE_CODE.VIEM_GAN_C.name, DISEASE_CODE.GIANGMAI.name],
      tests: [GD_TEST_CODE.SPECIAL, GD_TEST_CODE.ADVANCE] 
    },
    { 
      id: "s11", 
      text: "Phát ban lòng bàn tay hoặc bàn chân", 
      // risk: "Giang mai, HIV", 
      risk: [DISEASE_CODE.GIANGMAI.name, DISEASE_CODE.HIV.name],
      // tests: ["Gói xét nghiệm nâng cao - 16 chỉ số", "Gói xét nghiệm chuyên sâu - 21 chỉ số"] 
      tests: [GD_TEST_CODE.SPECIAL, GD_TEST_CODE.ADVANCE]
    },
    { 
      id: "s12", 
      text: "Triệu chứng khác", 
      risk: [], 
      tests: [GD_TEST_CODE.SPECIAL, GD_TEST_CODE.ADVANCE] 
    }
  ];