/**
 * GD Health - STI Risk Analyzer
 * Modular JavaScript application with consistent naming conventions
 */

// ==========================================================================
// Configuration and Data
// ==========================================================================

const GD_CONFIG = {
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

// Symptoms data with consistent structure
const GD_SYMPTOMS_DATA = [
  { 
    id: "s1", 
    text: "Ngứa vùng sinh dục (âm đạo, dương vật, hậu môn)", 
    risk: "Lậu, Chlamydia", 
    tests: ["Gói xét nghiệm nâng cao - 16 chỉ số", "Gói xét nghiệm chuyên sâu - 21 chỉ số"] 
  },
  { 
    id: "s2", 
    text: "Dịch tiết bất thường từ dương vật hoặc âm đạo hoặc hậu môn", 
    risk: "Lậu, Chlamydia", 
    tests: ["Gói xét nghiệm nâng cao - 10 chỉ số", "Gói xét nghiệm chuyên sâu - 21 chỉ số"] 
  },
  { 
    id: "s3", 
    text: "Tiểu buốt, tiểu gắt hoặc cảm giác nóng rát khi đi tiểu", 
    risk: "Lậu, Chlamydia", 
    tests: ["Gói xét nghiệm nâng cao - 16 chỉ số", "Gói xét nghiệm chuyên sâu - 21 chỉ số"] 
  },
  { 
    id: "s4", 
    text: "Đau hoặc chảy máu khi quan hệ tình dục", 
    risk: "Lậu, Chlamydia", 
    tests: ["Gói xét nghiệm nâng cao - 16 chỉ số", "Gói xét nghiệm chuyên sâu - 21 chỉ số"] 
  },
  { 
    id: "s5", 
    text: "Xuất hiện vết loét hoặc mụn nước quanh cơ quan sinh dục, hậu môn, miệng, hoặc lưỡi.", 
    risk: "Giang mai, HSV", 
    tests: ["Gói xét nghiệm nâng cao - 16 chỉ số", "Gói xét nghiệm chuyên sâu - 21 chỉ số"] 
  },
  { 
    id: "s6", 
    text: "Xuất hiện nốt sùi hoặc mụn cóc quanh cơ quan sinh dục, hậu môn, miệng, hoặc lưỡi.", 
    risk: "Sùi mào gà", 
    tests: ["Xét nghiệm HPV + Gói xét nghiệm nâng cao -16 chỉ số", "Xét nghiệm HPV + Gói xét nghiệm cơ bản- 5 chỉ số"] 
  },
  { 
    id: "s7", 
    text: "Sưng đau tinh hoàn, bìu", 
    risk: "Lậu, Chlamydia", 
    tests: ["Gói xét nghiệm nâng cao - 16 chỉ số", "Gói xét nghiệm chuyên sâu - 21 chỉ số"]
  },
  { 
    id: "s8", 
    text: "Đau vùng bụng từ rốn trở xuống (đau bụng dưới)", 
    risk: "Lậu, Chlamydia", 
    tests: ["Gói xét nghiệm nâng cao - 16 chỉ số", "Gói xét nghiệm chuyên sâu - 21 chỉ số"]
  },
  { 
    id: "s9", 
    text: "Đau rát họng, viêm họng hoặc ho kéo dài dai dẳng", 
    risk: "Lậu, Chlamydia", 
    tests: ["Gói xét nghiệm nâng cao - 16 chỉ số", "Gói xét nghiệm chuyên sâu - 21 chỉ số"] 
  },
  { 
    id: "s10", 
    text: "Sốt nhẹ, mệt mỏi, đau nhức cơ thể", 
    risk: "HSV, HIV, Viêm gan B, Viêm gan C, Giang mai", 
    tests: ["Gói xét nghiệm nâng cao - 16 chỉ số", "Gói xét nghiệm chuyên sâu - 21 chỉ số"] 
  },
  { 
    id: "s11", 
    text: "Phát ban lòng bàn tay hoặc bàn chân", 
    risk: "Giang mai, HIV", 
    tests: ["Gói xét nghiệm nâng cao - 16 chỉ số", "Gói xét nghiệm chuyên sâu - 21 chỉ số"] 
  },
  { 
    id: "s12", 
    text: "Triệu chứng khác", 
    risk: "special", 
    tests: ["Gói xét nghiệm chuyên sâu - 20 chỉ số"] 
  }
];

// Test display names mapping
const GD_TEST_DISPLAY_NAMES = { 
  "Gói xét nghiệm nâng cao - 16 chỉ số": "Gói xét nghiệm nâng cao - 16 chỉ số",
  "Gói xét nghiệm chuyên sâu - 21 chỉ số": "Gói xét nghiệm chuyên sâu - 21 chỉ số",
  "Gói xét nghiệm cơ bản - 5 chỉ số": "Gói xét nghiệm cơ bản - 5 chỉ số", 
  "Xét nghiệm HPV": "Xét nghiệm HPV", 
  "Xét nghiệm HPV + Gói xét nghiệm cơ bản- 5 chỉ số": "Xét nghiệm HPV và Gói xét nghiệm cơ bản - 5 chỉ số",
  "Xét nghiệm HPV + Gói xét nghiệm nâng cao -16 chỉ số": "Xét nghiệm HPV và Gói xét nghiệm nâng cao - 16 chỉ số",
  "Xét nghiệm HPV + Gói xét nghiệm chuyên sâu- 21 chỉ số": "Xét nghiệm HPV và Gói xét nghiệm chuyên sâu - 21 chỉ số"
};

// Pathogen detailed descriptions
const GD_PATHOGEN_DESCRIPTIONS = {
  "Lậu, Chlamydia": `<p><strong>Lậu và Chlamydia:</strong> Lậu do vi khuẩn <i>Neisseria gonorrhoeae</i> và Chlamydia do vi khuẩn <i>Chlamydia trachomatis</i> gây ra. Nếu không chẩn đoán và điều trị kịp thời, có thể dẫn đến vô sinh, thai ngoài tử cung, hẹp đường tiểu.</p>`,
  "Giang mai": `<p><strong>Giang mai:</strong> Bệnh giang mai do xoắn khuẩn <i>Treponema pallidum</i> gây ra. Nếu không chẩn đoán và điều trị kịp thời, có thể gây ra tổn thương tim, não và hệ thần kinh, thậm chí gây tử vong. Ngoài ra, bệnh giang mai có thể lây truyền từ mẹ sang con.</p>`,
  "HIV": `<p><strong>HIV:</strong> HIV là vi-rút gây Hội chứng suy giảm miễn dịch mắc phải (AIDS). Giai đoạn đầu thường chỉ có triệu chứng sốt nhẹ, đau nhức cơ thể như cúm nhưng sau đó tiềm ẩn lâu dài. Nếu không điều trị, HIV sẽ phá hủy hệ miễn dịch, dẫn đến các nhiễm trùng cơ hội, ung thư, và gây tử vong. Điều trị bằng thuốc kháng vi-rút có thể giúp bệnh nhân sống một cuộc đời khỏe mạnh và gần như bình thường.</p>`,
  "Sùi mào gà": `<p><strong>Sùi mào gà:</strong> HPV (Human Papillomavirus) là vi-rút lây truyền qua đường tình dục phổ biến, có thể gây sùi mào gà ở cơ quan sinh dục, hậu môn, miệng và lưỡi. Nếu không điều trị, một số chủng HPV có thể gây ung thư cổ tử cung, dương vật, hậu môn và hầu họng. Hiện nay chúng ta đã có vắc-xin phòng ngừa HPV, vì thế tầm soát và tiêm vaccine sớm là biện pháp phòng ngừa hiệu quả.</p>`, 
  "HSV": `<p><strong>HSV:</strong> HSV (Herpes Simplex Virus) là một loại vi-rút phổ biến gây mụn rộp quanh miệng (vi-rút HSV-1 ) và vùng sinh dục ( vi-rút HSV-2). Vi-rút HSV tồn tại suốt đời trong cơ thể và dễ tái phát. Nếu không điều trị, có thể gây ra viêm giác mạc mắt (gây mù) và viêm não. Đặc biệt, trẻ sơ sinh bị nhiễm HSV có nguy cơ tử vong cao.</p>`,
  "Viêm gan B": `<p><strong>Viêm gan B:</strong> HBV (Hepatitis B Virus) là vi-rút gây bệnh viêm gan B. Bệnh thường diễn biến âm thầm, không có triệu chứng rõ ràng. Nếu không điều trị, có thể dẫn đến xơ gan và ung thư gan, thậm chí đe dọa nghiêm trọng đến tính mạng. Hiện nay chúng ta đã có vắc-xin phòng ngừa viêm gan B, vì thế tầm soát và tiêm vaccine sớm là biện pháp phòng ngừa hiệu quả.</p>`,
  "Viêm gan C": `<p><strong>Viêm gan C:</strong> HCV (Hepatitis C Virus) là vi-rút gây bệnh viêm gan C. Bệnh diến biến âm thầm và thường được chẩn đoán muộn. Nếu không điều trị, có thể dẫn đến xơ gan, suy gan và ung thư gan. Dù chưa có vắc-xin phòng ngừa, tuy nhiên bệnh có thể được trị khỏi hoàn toàn.</p>`
};

// ==========================================================================
// Application State Management
// ==========================================================================

class GDAppState {
  constructor() {
    this.history = [];
    this.userAnswers = {};
    this.currentStep = null;
  }

  reset() {
    this.history = [];
    this.userAnswers = {};
    this.currentStep = null;
  }

  addToHistory(stepId) {
    this.history.push(stepId);
  }

  goBack() {
    return this.history.pop();
  }

  setAnswer(key, value) {
    this.userAnswers[key] = value;
  }

  getAnswer(key) {
    return this.userAnswers[key];
  }
}

// ==========================================================================
// DOM Element Management
// ==========================================================================

class GDDOMManager {
  constructor() {
    this.elements = {
      steps: document.querySelectorAll('.gd-step'),
      quizContainer: document.getElementById('quiz-container'),
      resultsContainer: document.getElementById('results-container'),
      navigation: document.getElementById('navigation'),
      prevBtn: document.getElementById('prev-btn'),
      nextBtn: document.getElementById('next-btn'),
      headerDescription: document.getElementById('header-description'),
      mainHeader: document.getElementById('main-header'),
      symptomsList: document.getElementById('symptoms-list')
    };
  }

  showStep(stepId) {
    // Hide all steps
    this.elements.steps.forEach(step => {
      step.classList.remove('gd-step--active');
    });

    // Show target step
    const targetStep = document.getElementById(stepId);
    if (targetStep) {
      targetStep.classList.add('gd-step--active');
    }

    this.updateNavigationButtons();
    this.updateHeader(stepId);
  }

  updateNavigationButtons() {
    const hasHistory = appState.history.length > 0;
    this.elements.prevBtn.classList.toggle('gd-btn--hidden', !hasHistory);
  }

  updateHeader(stepId) {
    // Always show the header when showing a step (not a result page)
    this.elements.mainHeader.style.display = 'block';
    
    if (stepId === GD_CONFIG.STEPS.START) {
      this.elements.headerDescription.textContent = 'Chỉ với 2 phút, GDCompass™ giúp bạn tìm hiểu nguy cơ mắc bệnh xã hội và các xét nghiệm có thể phù hợp với bạn.';
    } else {
      this.elements.headerDescription.textContent = this.getOriginalDisclaimerText();
    }
  }

  getOriginalDisclaimerText() {
    return `GDCompass™ được phát triển bởi GD Health, dựa trên hướng dẫn của Trung tâm Kiểm soát và Phòng ngừa Dịch bệnh Hoa Kỳ (CDC) và Tổ chức Y tế Thế giới (WHO). Ứng dụng này đã được đăng ký bản quyền tác giả tại Cục Bản Quyền Tác Giả. Kết qủa từ GDcompass không thay thế cho việc tư vấn, chẩn đoán, và điều trị của bác sĩ. Tuy nhiên, bạn có thể sử dụng kết quả từ GDcompasss để trao đổi với chuyên gia y tế của chúng tôi và quyết định giải pháp phù hơp nhất cho bạn. GDCompass™ không hỏi thông tin định danh, vì thế bạn có thể hoàn toàn yên tâm. Sự bảo mật thông tin của bạn là ưu tiên hàng đầu của GDHealth!`;
  }

  showResults() {
    this.elements.quizContainer.style.display = 'none';
    this.elements.navigation.style.display = 'none';
    this.elements.resultsContainer.style.display = 'block';
    this.elements.mainHeader.style.display = 'none';
  }

  hideResults() {
    this.elements.resultsContainer.style.display = 'none';
    this.elements.quizContainer.style.display = 'block';
    this.elements.navigation.style.display = 'flex';
    this.elements.mainHeader.style.display = 'block';
  }

  clearResults() {
    this.elements.resultsContainer.innerHTML = '';
  }

  showError(stepId) {
    const errorElement = document.getElementById(`error-${stepId}`);
    if (errorElement) {
      errorElement.classList.remove('gd-error--hidden');
    }
  }

  hideError(stepId) {
    const errorElement = document.getElementById(`error-${stepId}`);
    if (errorElement) {
      errorElement.classList.add('gd-error--hidden');
    }
  }

  resetForm() {
    document.querySelectorAll('input').forEach(input => {
      input.checked = false;
    });
    document.querySelectorAll('[id^="error-"]').forEach(error => {
      error.classList.add('gd-error--hidden');
    });
  }
}

// ==========================================================================
// Validation Logic
// ==========================================================================

class GDValidator {
  static validateStep(stepId) {
    const stepElement = document.getElementById(stepId);
    if (!stepElement) return false;

    const inputs = stepElement.querySelectorAll('input:checked');
    const hasSelection = inputs.length > 0;

    if (!hasSelection) {
      domManager.showError(stepId);
      return false;
    }

    domManager.hideError(stepId);
    return true;
  }
}

// ==========================================================================
// Results Generation
// ==========================================================================

class GDResultsGenerator {
  static generateResult(resultType) {
    domManager.clearResults();
    domManager.showResults();

    let content = '';

    switch (resultType) {
      case GD_CONFIG.RESULT_TYPES.DIAGNOSED:
        content = this.generateDiagnosedResult();
        break;
      case GD_CONFIG.RESULT_TYPES.NO_SYMPTOMS_RISK_FOUND:
        content = this.generateNoSymptomsRiskFoundResult();
        break;
      case GD_CONFIG.RESULT_TYPES.NO_RISK_RESULT:
        content = this.generateNoRiskResult();
        break;
      case GD_CONFIG.RESULT_TYPES.SYMPTOM_RESULT:
        content = this.generateSymptomResult();
        break;
      default:
        content = '<p>Kết quả không xác định.</p>';
    }

    domManager.elements.resultsContainer.innerHTML = content;
    this.addBackToStartButton();
    this.setupDropdownToggle();
  }

  static generateDiagnosedResult() {
    return `
      <h2 class="gd-results__title">Giải pháp cho bạn</h2>
      <div class="gd-results__content">
        <div class="gd-results__success-box">
          <p class="gd-results__success-text">Tham khảo các giải pháp điều trị và phòng ngừa</p>
          <button class="gd-btn gd-btn--success gd-mt-2">Nhà thuốc →</button>
        </div>
      </div>
    `;
  }

  static generateNoSymptomsRiskFoundResult() {
    const impliedRisks = new Set(['Lậu', 'Chlamydia', 'Giang mai', 'HIV']);
    const pathogenInfoHtml = this.generatePathogenInfo(impliedRisks, ["Lậu, Chlamydia", "Giang mai", "HIV"]);

    return `
      <h2 class="gd-results__title">Kết quả đánh giá</h2>
      <div class="gd-results__content">
        <div class="gd-results__text">
          Dựa trên thông tin bạn cung cấp, bạn có nguy cơ cao mắc các bệnh xã hội như là <span class="gd-results__highlight">Lậu</span>, <span class="gd-results__highlight">Chlamydia</span>, <span class="gd-results__highlight">Giang mai</span>, <span class="gd-results__highlight">HIV</span>...
        </div>
        <div class="gd-results__text">
          Tầm soát bệnh xã hội ngay khi có nguy cơ để bảo vệ sức khỏe của bạn. Nếu không được phát hiện và điều trị kịp thời, bệnh có thể dẫn đến tổn thương cơ quan sinh dục, gây vô sinh, và lây lan âm thầm trong cộng đồng.
        </div>
        <div class="gd-dropdown" id="medical-info-dropdown">
          <div class="gd-dropdown__header">
            <h3 class="gd-dropdown__title">Thông tin y khoa cho bạn</h3>
            <svg class="gd-dropdown__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="6,9 12,15 18,9"></polyline>
            </svg>
          </div>
          <div class="gd-dropdown__content">
            <div class="gd-dropdown__body">
              ${pathogenInfoHtml}
            </div>
          </div>
        </div>
        <div class="gd-results__section">
          <h3 class="gd-results__section-title">Xét nghiệm gợi ý cho bạn:</h3>
          <div class="gd-results__test-link">${GD_TEST_DISPLAY_NAMES["Gói xét nghiệm chuyên sâu - 21 chỉ số"]}</div>
          <div class="gd-results__divider">Hoặc</div>
          <div class="gd-results__test-link">${GD_TEST_DISPLAY_NAMES["Gói xét nghiệm nâng cao - 16 chỉ số"]}</div>
        </div>
        <div class="gd-results__section gd-text-center">
          <p class="gd-results__text">Chuyên gia của chúng tôi sẵn sàng lắng nghe và trao đổi trực tiếp với bạn.</p>
          <button class="gd-btn gd-btn--primary gd-mt-4">Tư vấn ngay với chuyên gia</button>
        </div>
      </div>
    `;
  }

  static generateNoRiskResult() {
    return `
      <div class="gd-results__content">
        <div class="gd-results__success-box">
          <p class="gd-results__success-text">
            Dựa trên thông tin bạn cung cấp, nguy cơ mắc bệnh xã hội của bạn thấp. Nếu bạn vẫn cảm thấy lo lắng, trao đổi ngay với chuyên gia y tế của chúng tôi.
          </p>
          <div class="gd-results__section gd-text-center">
            <p class="gd-results__text">Chuyên gia của chúng tôi sẵn sàng lắng nghe và trao đổi trực tiếp với bạn.</p>
            <button class="gd-btn gd-btn--primary gd-mt-4">Tư vấn ngay với chuyên gia</button>
          </div>
        </div>
      </div>
    `;
  }

  static generateSymptomResult() {
    const checkedSymptoms = document.querySelectorAll('#symptoms-list input:checked');
    
    // Handle "Triệu chứng khác" only case
    if (checkedSymptoms.length === 1 && checkedSymptoms[0].getAttribute('data-id') === 's12') {
      return this.generateSpecialSymptomsResult();
    }

    const allRisks = this.extractRisksFromSymptoms(checkedSymptoms);
    const displayedRisks = this.formatRisksForDisplay(allRisks);
    const pathogenInfoHtml = this.generatePathogenInfo(allRisks);
    const suggestedTestsHtml = this.generateSuggestedTests(allRisks, checkedSymptoms);

    return `
      <h2 class="gd-results__title">Kết quả đánh giá</h2>
      <div class="gd-results__content">
        <div class="gd-results__text">
          Dựa vào thông tin bạn cung cấp, bạn có nguy cơ mắc <span class="gd-results__highlight">${displayedRisks}</span>. Ngoài ra, chưa thể loại trừ các bệnh xã hội khác.
        </div>
        <div class="gd-results__text">
          Bạn cần xét nghiệm ngay để được chẩn đoán và điều trị sớm.
        </div>
        <div class="gd-dropdown" id="medical-info-dropdown">
          <div class="gd-dropdown__header">
            <h3 class="gd-dropdown__title">Thông tin y khoa cho bạn</h3>
            <svg class="gd-dropdown__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="6,9 12,15 18,9"></polyline>
            </svg>
          </div>
          <div class="gd-dropdown__content">
            <div class="gd-dropdown__body">
              ${pathogenInfoHtml}
            </div>
          </div>
        </div>
        <div class="gd-results__section">
          <h3 class="gd-results__section-title">Xét nghiệm gợi ý cho bạn:</h3>
          ${suggestedTestsHtml}
        </div>
        <div class="gd-results__section gd-text-center">
          <p class="gd-results__text">Chúng tôi luôn sẵn sàng lắng nghe và đồng hành cùng bạn xuyên suốt mọi giai đoạn - tư vấn, chẩn đoán, điều trị và sau điều trị.</p>
          <button class="gd-btn gd-btn--primary gd-mt-4">Tư vấn ngay với chuyên gia</button>
        </div>
      </div>
    `;
  }

  static generateSpecialSymptomsResult() {
    const impliedRisks = new Set(['Lậu', 'Chlamydia', 'Giang mai', 'HIV']);
    const pathogenInfoHtml = this.generatePathogenInfo(impliedRisks, ["Lậu, Chlamydia", "Giang mai", "HIV"]);

    return `
      <h2 class="gd-results__title">Kết quả đánh giá</h2>
      <div class="gd-results__content">
        <div class="gd-results__text">
          Dựa trên thông tin bạn cung cấp, bạn có nguy cơ cao mắc các bệnh xã hội như là <span class="gd-results__highlight">Lậu</span>, <span class="gd-results__highlight">Chlamydia</span>, <span class="gd-results__highlight">Giang mai</span>, <span class="gd-results__highlight">HIV</span>...
        </div>
        <div class="gd-results__text">
          Tầm soát bệnh xã hội ngay khi có nguy cơ để bảo vệ sức khỏe của bạn. Nếu không được phát hiện và điều trị kịp thời, bệnh có thể dẫn đến tổn thương cơ quan sinh dục, gây vô sinh, và lây lan âm thầm trong cộng đồng.
        </div>
        <div class="gd-dropdown" id="medical-info-dropdown">
          <div class="gd-dropdown__header">
            <h3 class="gd-dropdown__title">Thông tin y khoa cho bạn</h3>
            <svg class="gd-dropdown__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="6,9 12,15 18,9"></polyline>
            </svg>
          </div>
          <div class="gd-dropdown__content">
            <div class="gd-dropdown__body">
              ${pathogenInfoHtml}
            </div>
          </div>
        </div>
        <div class="gd-results__section">
          <h3 class="gd-results__section-title">Xét nghiệm gợi ý cho bạn:</h3>
          <div class="gd-results__test-link">${GD_TEST_DISPLAY_NAMES["Gói xét nghiệm chuyên sâu - 21 chỉ số"]}</div>
          <div class="gd-results__divider">Hoặc</div>
          <div class="gd-results__test-link">${GD_TEST_DISPLAY_NAMES["Gói xét nghiệm nâng cao - 16 chỉ số"]}</div>
        </div>
        <div class="gd-results__section gd-text-center">
          <p class="gd-results__text">Chúng tôi luôn sẵn sàng lắng nghe và đồng hành cùng bạn xuyên suốt mọi giai đoạn - tư vấn, chẩn đoán, điều trị và sau điều trị.</p>
          <button class="gd-btn gd-btn--primary gd-mt-4">Tư vấn ngay với chuyên gia</button>
        </div>
      </div>
    `;
  }

  static extractRisksFromSymptoms(checkedSymptoms) {
    const allRisks = new Set();
    
    checkedSymptoms.forEach(cb => {
      const symptomId = cb.getAttribute('data-id');
      const symptomInfo = GD_SYMPTOMS_DATA.find(s => s.id === symptomId);
      if (symptomInfo && symptomInfo.risk !== 'special') {
        symptomInfo.risk.split(', ').forEach(r => allRisks.add(r.trim()));
      }
    });

    return allRisks;
  }

  static formatRisksForDisplay(allRisks) {
    let displayedRisks = [];
    let otherRisksSorted = [];

    // Always include "Sùi mào gà" first if present
    if (allRisks.has("Sùi mào gà")) {
      displayedRisks.push("Sùi mào gà");
      allRisks.delete("Sùi mào gà");
    }
    
    // Handle Lậu and Chlamydia order
    if (allRisks.has("Lậu")) {
      otherRisksSorted.push("Lậu");
      allRisks.delete("Lậu");
    }
    if (allRisks.has("Chlamydia")) {
      otherRisksSorted.push("Chlamydia");
      allRisks.delete("Chlamydia");
    }
    
    // Add remaining risks alphabetically
    otherRisksSorted = otherRisksSorted.concat(Array.from(allRisks).sort());
    displayedRisks = displayedRisks.concat(otherRisksSorted);

    return displayedRisks.join(', ');
  }

  static generatePathogenInfo(allRisks, order = null) {
    let pathogenInfoHtml = '';
    const describedPathogens = new Set();

    const pathogenOrder = order || ["Sùi mào gà", "Lậu, Chlamydia", "Giang mai", "HIV", "HSV", "Viêm gan B", "Viêm gan C"];

    for (const pathogen of pathogenOrder) {
      if (pathogen === "Lậu, Chlamydia") {
        if ((allRisks.has('Lậu') || allRisks.has('Chlamydia')) && !describedPathogens.has('Lậu, Chlamydia')) {
          pathogenInfoHtml += GD_PATHOGEN_DESCRIPTIONS[pathogen];
          describedPathogens.add('Lậu, Chlamydia');
        }
      } else if (allRisks.has(pathogen) && !describedPathogens.has(pathogen)) {
        pathogenInfoHtml += GD_PATHOGEN_DESCRIPTIONS[pathogen];
        describedPathogens.add(pathogen);
      }
    }

    return pathogenInfoHtml;
  }

  static generateSuggestedTests(allRisks, checkedSymptoms) {
    const specificSymptomsChecked = Array.from(checkedSymptoms).filter(cb => cb.getAttribute('data-id') !== 's12');
    const isOnlySuiMaoGa = specificSymptomsChecked.length === 1 && specificSymptomsChecked[0].getAttribute('data-id') === 's6';
    
    if (isOnlySuiMaoGa) {
      return `
        <div class="gd-results__test-link">${GD_TEST_DISPLAY_NAMES["Xét nghiệm HPV + Gói xét nghiệm nâng cao -16 chỉ số"]}</div>
        <div class="gd-results__divider">Hoặc</div>
        <div class="gd-results__test-link">${GD_TEST_DISPLAY_NAMES["Xét nghiệm HPV + Gói xét nghiệm cơ bản- 5 chỉ số"]}</div>
      `;
    } else if (allRisks.has("Sùi mào gà")) {
      return `
        <div class="gd-results__test-link">${GD_TEST_DISPLAY_NAMES["Xét nghiệm HPV + Gói xét nghiệm chuyên sâu- 21 chỉ số"]}</div>
        <div class="gd-results__divider">Hoặc</div>
        <div class="gd-results__test-link">${GD_TEST_DISPLAY_NAMES["Xét nghiệm HPV + Gói xét nghiệm nâng cao -16 chỉ số"]}</div>
      `;
    } else {
      return `
        <div class="gd-results__test-link">${GD_TEST_DISPLAY_NAMES["Gói xét nghiệm chuyên sâu - 21 chỉ số"]}</div>
        <div class="gd-results__divider">Hoặc</div>
        <div class="gd-results__test-link">${GD_TEST_DISPLAY_NAMES["Gói xét nghiệm nâng cao - 16 chỉ số"]}</div>
      `;
    }
  }

  static addBackToStartButton() {
    const backToStartBtn = document.createElement('button');
    backToStartBtn.textContent = 'Làm lại từ đầu';
    backToStartBtn.className = 'gd-btn gd-btn--secondary gd-mt-4';
    backToStartBtn.style.width = '100%';
    
    backToStartBtn.addEventListener('click', () => {
      appState.reset();
      domManager.hideResults();
      domManager.resetForm();
      domManager.showStep(GD_CONFIG.STEPS.START);
    });
    
    domManager.elements.resultsContainer.appendChild(backToStartBtn);
  }

  static setupDropdownToggle() {
    const dropdown = document.getElementById('medical-info-dropdown');
    if (!dropdown) return;

    const header = dropdown.querySelector('.gd-dropdown__header');
    const content = dropdown.querySelector('.gd-dropdown__content');
    const icon = dropdown.querySelector('.gd-dropdown__icon');

    header.addEventListener('click', () => {
      const isExpanded = content.classList.contains('gd-dropdown__content--expanded');
      
      if (isExpanded) {
        // Collapse
        content.classList.remove('gd-dropdown__content--expanded');
        icon.classList.remove('gd-dropdown__icon--rotated');
      } else {
        // Expand
        content.classList.add('gd-dropdown__content--expanded');
        icon.classList.add('gd-dropdown__icon--rotated');
      }
    });
  }
}

// ==========================================================================
// Step Navigation Logic
// ==========================================================================

class GDStepNavigator {
  static handleNext() {
    const activeStep = document.querySelector('.gd-step--active');
    if (!activeStep || !GDValidator.validateStep(activeStep.id)) {
      return;
    }
    
    appState.addToHistory(activeStep.id);
    
    const selectedFlow = document.querySelector('input[name="flow"]:checked')?.value;
    
    switch (activeStep.id) {
      case GD_CONFIG.STEPS.START:
        appState.setAnswer('flow', selectedFlow);
        if (selectedFlow === GD_CONFIG.FLOW_TYPES.DIAGNOSED) {
          GDResultsGenerator.generateResult(GD_CONFIG.RESULT_TYPES.DIAGNOSED);
        } else {
          domManager.showStep(GD_CONFIG.STEPS.GENITALIA);
        }
        break;
        
      case GD_CONFIG.STEPS.GENITALIA:
        appState.setAnswer('genitalia', document.querySelector('input[name="genitalia"]:checked').value);
        domManager.showStep(GD_CONFIG.STEPS.SEXUAL_HABIT);
        break;
        
      case GD_CONFIG.STEPS.SEXUAL_HABIT:
        appState.setAnswer('habit', Array.from(document.querySelectorAll('input[name="habit"]:checked')).map(cb => cb.value));
        domManager.showStep(GD_CONFIG.STEPS.RISK_FACTORS);
        break;
        
      case GD_CONFIG.STEPS.RISK_FACTORS:
        if (appState.getAnswer('flow') === GD_CONFIG.FLOW_TYPES.NO_SYMPTOMS) {
          const hasRisk = Array.from(document.querySelectorAll('#risk-factors-list input[name="risk"]:checked'))
            .some(cb => cb.id !== 'no-risk-factor');
          const resultType = hasRisk ? GD_CONFIG.RESULT_TYPES.NO_SYMPTOMS_RISK_FOUND : GD_CONFIG.RESULT_TYPES.NO_RISK_RESULT;
          GDResultsGenerator.generateResult(resultType);
        } else {
          GDStepNavigator.generateSymptomsList();
          domManager.showStep(GD_CONFIG.STEPS.SYMPTOM_CHECKLIST);
        }
        break;
        
      case GD_CONFIG.STEPS.SYMPTOM_CHECKLIST:
        GDResultsGenerator.generateResult(GD_CONFIG.RESULT_TYPES.SYMPTOM_RESULT);
        break;
    }
  }

  static handlePrev() {
    const lastStepId = appState.goBack();
    if (lastStepId) {
      domManager.showStep(lastStepId);
      if (domManager.elements.resultsContainer.style.display === 'block') {
        domManager.hideResults();
      }
    }
  }

  static generateSymptomsList() {
    const symptomsListContainer = domManager.elements.symptomsList;
    symptomsListContainer.innerHTML = '';
    
    GD_SYMPTOMS_DATA.forEach((symptom) => {
      const label = document.createElement('label');
      label.className = 'gd-checkbox';
      label.innerHTML = `
        <input type="checkbox" data-id="${symptom.id}" class="gd-checkbox__input">
        <span class="gd-checkbox__label">${symptom.text}</span>
      `;
      symptomsListContainer.appendChild(label);
    });
  }
}

// ==========================================================================
// Checkbox Logic Management
// ==========================================================================

class GDCheckboxManager {
  static setupExclusiveCheckbox(containerId, noneId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    const noneCheckbox = container.querySelector(`#${noneId}`);
    const otherCheckboxes = container.querySelectorAll(`input[type="checkbox"]:not(#${noneId})`);

    noneCheckbox?.addEventListener('change', (e) => {
      if (e.target.checked) {
        otherCheckboxes.forEach(cb => cb.checked = false);
      }
    });

    otherCheckboxes.forEach(cb => {
      cb.addEventListener('change', (e) => {
        if (e.target.checked && noneCheckbox) {
          noneCheckbox.checked = false;
        }
      });
    });
  }

  static setupSymptomsExclusiveLogic() {
    const symptomsListElement = domManager.elements.symptomsList;
    if (!symptomsListElement) return;

    symptomsListElement.addEventListener('change', (event) => {
      if (event.target.type === 'checkbox') {
        const s12Checkbox = symptomsListElement.querySelector('input[data-id="s12"]');
        if (s12Checkbox) {
          if (event.target.getAttribute('data-id') === 's12' && s12Checkbox.checked) {
            symptomsListElement.querySelectorAll('input[type="checkbox"]:not([data-id="s12"])').forEach(cb => {
              cb.checked = false;
            });
          } else if (event.target.getAttribute('data-id') !== 's12' && event.target.checked) {
            s12Checkbox.checked = false;
          }
        }
      }
    });
  }
}

// ==========================================================================
// Application Initialization
// ==========================================================================

// Global instances
let appState;
let domManager;

// Initialize application
function initializeApp() {
  appState = new GDAppState();
  domManager = new GDDOMManager();

  // Set up event listeners
  domManager.elements.nextBtn.addEventListener('click', GDStepNavigator.handleNext);
  domManager.elements.prevBtn.addEventListener('click', GDStepNavigator.handlePrev);

  // Set up checkbox exclusive logic
  GDCheckboxManager.setupExclusiveCheckbox('risk-factors-list', 'no-risk-factor');
  GDCheckboxManager.setupSymptomsExclusiveLogic();

  // Initialize the first step
  domManager.showStep(GD_CONFIG.STEPS.START);
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeApp);

