/**
 * GD Health - STI Risk Analyzer
 * Modular JavaScript application with consistent naming conventions
 */

import { GD_CONFIG, GD_SYMPTOMS_DATA, DISEASE_CODE, BASIC_TEST_PACKAGES, COMMON_TEST_PACKAGES, HPV_TEST_PACKAGE } from "./constants.js";


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
      this.elements.headerDescription.innerHTML = 'Chỉ với 2 phút, <span class="gd-soft-highlight">GDCompass™</span> giúp bạn tìm hiểu nguy cơ mắc bệnh xã hội và các xét nghiệm có thể phù hợp với bạn.';
    } else {
      this.elements.headerDescription.innerHTML = this.getOriginalDisclaimerText();
    }
  }

  getOriginalDisclaimerText() {
    return `
      <span class="gd-soft-highlight">GDCompass™</span> được phát triển bởi GD Health, dựa trên hướng dẫn của Trung tâm Kiểm soát và Phòng ngừa Dịch bệnh Hoa Kỳ (CDC) và Tổ chức Y tế Thế giới (WHO). Ứng dụng này đã được đăng ký bản quyền tác giả tại Cục Bản Quyền Tác Giả. Kết qủa từ <span class="gd-soft-highlight">GDCompass™</span> không thay thế cho việc tư vấn, chẩn đoán, và điều trị của bác sĩ. Tuy nhiên, bạn có thể sử dụng kết quả từ <span class="gd-soft-highlight">GDCompass™</span> để trao đổi với chuyên gia y tế của chúng tôi và quyết định giải pháp phù hơp nhất cho bạn. <span class="gd-soft-highlight">GDCompass™</span> không hỏi thông tin định danh, vì thế bạn có thể hoàn toàn yên tâm. Sự bảo mật thông tin của bạn là ưu tiên hàng đầu của GDHealth!`;
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

  static generateTestSuggestion(test_list) {
    return test_list
        .map(test => `<div class="gd-results__test-link">${test}</div>`)
        .join('<div class="gd-results__divider">Hoặc</div>');
  }

  static generateTestSuggestionSection(suggestedTestsHtml) {
    return `
       <div class="gd-results__section">
        <h3 class="gd-results__section-title">Xét nghiệm gợi ý cho bạn:</h3>
        ${suggestedTestsHtml}
      </div>
    `
  }
  static generateConsultButton() {
    return `<button class="gd-btn gd-btn--primary gd-mt-4">Tư vấn ngay với chuyên gia</button>`;
  }

  static generatepathogenInfo(pathogenInfoHtml) {
    return `
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
    `
  }

  static generateNoSymptomsRiskFoundResult() {
    const allAvailableRisks = [];
    Object.values(DISEASE_CODE).forEach(risk => allAvailableRisks.push(risk.name));
    const displayedRisks = allAvailableRisks.length > 3 ? allAvailableRisks.slice(0, 3) : allAvailableRisks;
    const pathogenInfoHtml = this.generatePathogenInfo(displayedRisks);
    const suggestedTestsHtml = this.generateTestSuggestion(COMMON_TEST_PACKAGES);

    return `
      <h2 class="gd-results__title">Kết quả đánh giá</h2>
      <div class="gd-results__content">
        <div class="gd-results__text">
          Dựa trên thông tin bạn cung cấp, bạn có nguy cơ cao mắc các bệnh xã hội như là mắc <span class="gd-results__highlight">${displayedRisks.join(", ")}...</span>
        </div>
        <div class="gd-results__text">
          Tầm soát bệnh xã hội ngay khi có nguy cơ để bảo vệ sức khỏe của bạn. Nếu không được phát hiện và điều trị kịp thời, bệnh có thể dẫn đến tổn thương cơ quan sinh dục, gây vô sinh, và lây lan âm thầm trong cộng đồng.
        </div>
        ${this.generateTestSuggestionSection(suggestedTestsHtml)}
        <div class="gd-results__section gd-text-center">
          <p class="gd-results__text">Chuyên gia của chúng tôi sẵn sàng lắng nghe và trao đổi trực tiếp với bạn.</p>
          ${this.generateConsultButton()}
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
            ${this.generateConsultButton()}
          </div>
        </div>
      </div>
    `;
  }

  static generateSymptomResult() {
    const checkedSymptoms = document.querySelectorAll('#symptoms-list input:checked');
    
    // Handle "Triệu chứng khác" only case
    if (checkedSymptoms.length === 1 && checkedSymptoms[0].getAttribute('data-id') === 's12') {
      return this.generateNoSymptomsRiskFoundResult();
    }

    const allRisks = this.extractRisksFromSymptoms(checkedSymptoms);
    const displayedRisks = this.formatRisksForDisplay(allRisks);
    const pathogenInfoHtml = this.generatePathogenInfo(allRisks);
    const suggestedTestsHtml = this.generateSuggestedTests(checkedSymptoms);

    return `
      <h2 class="gd-results__title">Kết quả đánh giá</h2>
      <div class="gd-results__content">
        <div class="gd-results__text">
          Dựa vào thông tin bạn cung cấp, bạn có nguy cơ mắc <span class="gd-results__highlight">${displayedRisks}</span>. Ngoài ra, chưa thể loại trừ các bệnh xã hội khác.
        </div>
        <div class="gd-results__text">
          Bạn cần xét nghiệm ngay để được chẩn đoán và điều trị sớm.
        </div>
        ${this.generatepathogenInfo(pathogenInfoHtml)}
        ${this.generateTestSuggestionSection(suggestedTestsHtml)}

        <div class="gd-results__section gd-text-center">
          <p class="gd-results__text">Chúng tôi luôn sẵn sàng lắng nghe và đồng hành cùng bạn xuyên suốt mọi giai đoạn - tư vấn, chẩn đoán, điều trị và sau điều trị.</p>
          ${this.generateConsultButton()}
        </div>
      </div>
    `;
  }

  static extractRisksFromSymptoms(checkedSymptoms) {
    const allRisks = new Set();
    
    checkedSymptoms.forEach(cb => {
      const symptomId = cb.getAttribute('data-id');
      const symptomInfo = GD_SYMPTOMS_DATA.find(s => s.id === symptomId);
      if (symptomInfo) {
        symptomInfo.risk.forEach(risk => allRisks.add(risk));
      }
    });

    return allRisks;
  }

  static generatePathogenInfo(allRisks) {
    let pathogenInfoHtml = '';
    allRisks.forEach(risk => pathogenInfoHtml += risk.description);
    return pathogenInfoHtml;
  }

  static formatRisksForDisplay(allRisks) {
    const displayedRisks = [];
    allRisks.forEach(risk => displayedRisks.push(risk.name));
    return displayedRisks.join(", ");
  }

  static generateSuggestedTests(checkedSymptoms, noSymptom = false) {
    console.log("suggest test");
    console.log(checkedSymptoms)

    // const allRisks = new Set();
    
    // checkedSymptoms.forEach(cb => {
    //   const symptomId = cb.getAttribute('data-id');
    //   const symptomInfo = GD_SYMPTOMS_DATA.find(s => s.id === symptomId);
    //   if (symptomInfo) {
    //     symptomInfo.risk.forEach(risk => allRisks.add(risk));
    //   }
    // });

    // return allRisks;
    const SUIMAOGA_ID = 's6';
    const specificSymptomsChecked = Array.from(checkedSymptoms).filter(cb => cb.getAttribute('data-id') !== 's12');
    const isOnlySuiMaoGa = specificSymptomsChecked.length === 1 && specificSymptomsChecked[0].getAttribute('data-id') === SUIMAOGA_ID;
    
    const testLists = [];
    if (noSymptom) {
      COMMON_TEST_PACKAGES.forEach(testPackage => testLists.push(testPackage));
    }
    if (isOnlySuiMaoGa) {
      BASIC_TEST_PACKAGES.map(testPackage => [HPV_TEST_PACKAGE, testPackage].join(" và ")).forEach(combinedPackage => testLists.push(combinedPackage));      // return `
      //   <div class="gd-results__test-link">${GD_TEST_DISPLAY_NAMES["Xét nghiệm HPV + Gói xét nghiệm nâng cao -16 chỉ số"]}</div>
      //   <div class="gd-results__divider">Hoặc</div>
      //   <div class="gd-results__test-link">${GD_TEST_DISPLAY_NAMES["Xét nghiệm HPV + Gói xét nghiệm cơ bản- 5 chỉ số"]}</div>
      // `;
    } else if (Array.from(checkedSymptoms).some(cb => cb.getAttribute('data-id') === SUIMAOGA_ID)) {
      COMMON_TEST_PACKAGES.map(testPackage => [HPV_TEST_PACKAGE, testPackage].join(" và ")).forEach(combinedPackage => testLists.push(combinedPackage));

      // return `
      //   <div class="gd-results__test-link">${GD_TEST_DISPLAY_NAMES["Xét nghiệm HPV + Gói xét nghiệm chuyên sâu- 21 chỉ số"]}</div>
      //   <div class="gd-results__divider">Hoặc</div>
      //   <div class="gd-results__test-link">${GD_TEST_DISPLAY_NAMES["Xét nghiệm HPV + Gói xét nghiệm nâng cao -16 chỉ số"]}</div>
      // `;
    } else {
      COMMON_TEST_PACKAGES.forEach(testPackage => testLists.push(testPackage));
      // return `
      //   <div class="gd-results__test-link">${GD_TEST_DISPLAY_NAMES["Gói xét nghiệm chuyên sâu - 21 chỉ số"]}</div>
      //   <div class="gd-results__divider">Hoặc</div>
      //   <div class="gd-results__test-link">${GD_TEST_DISPLAY_NAMES["Gói xét nghiệm nâng cao - 16 chỉ số"]}</div>
      // `;
    }
    return this.generateTestSuggestion(testLists);

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

