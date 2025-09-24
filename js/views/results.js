(function() {
  const C = () => window.GDViews.components;

  function renderDiagnosed() {
    return `
      <h2 class="gd-results__title">Giải pháp cho bạn</h2>
      <div class="gd-results__content">
        <div class="gd-results__success-box">
          <p class="gd-results__success-text">Tham khảo các giải pháp điều trị và phòng ngừa</p>
          ${C().button({ variant: 'success', text: 'Nhà thuốc →', extraClasses: 'gd-mt-2' })}
        </div>
      </div>`;
  }

  function renderNoSymptomsRiskFound({ pathogenInfoHtml, test21, test16 }) {
    return `
      <h2 class="gd-results__title">Kết quả đánh giá</h2>
      <div class="gd-results__content">
        <div class="gd-results__text">
          Dựa trên thông tin bạn cung cấp, bạn có nguy cơ cao mắc các bệnh xã hội như là <span class="gd-results__highlight">Lậu</span>, <span class="gd-results__highlight">Chlamydia</span>, <span class="gd-results__highlight">Giang mai</span>, <span class="gd-results__highlight">HIV</span>...
        </div>
        <div class="gd-results__text">
          Tầm soát bệnh xã hội ngay khi có nguy cơ để bảo vệ sức khỏe của bạn. Nếu không được phát hiện và điều trị kịp thời, bệnh có thể dẫn đến tổn thương cơ quan sinh dục, gây vô sinh, và lây lan âm thầm trong cộng đồng.
        </div>
        ${C().dropdown({ html: pathogenInfoHtml })}
        <div class="gd-results__section">
          ${C().sectionTitle('Xét nghiệm gợi ý cho bạn:')}
          ${C().testLink(test21)}
          ${C().divider('Hoặc')}
          ${C().testLink(test16)}
        </div>
        <div class="gd-results__section gd-text-center">
          <p class="gd-results__text">Chuyên gia của chúng tôi sẵn sàng lắng nghe và trao đổi trực tiếp với bạn.</p>
          ${C().button({ variant: 'primary', text: 'Tư vấn ngay với chuyên gia', extraClasses: 'gd-mt-4' })}
        </div>
      </div>`;
  }

  function renderSymptomResult({ displayedRisks, pathogenInfoHtml, suggestedTestsHtml }) {
    return `
      <h2 class="gd-results__title">Kết quả đánh giá</h2>
      <div class="gd-results__content">
        <div class="gd-results__text">
          Dựa vào thông tin bạn cung cấp, bạn có nguy cơ mắc <span class="gd-results__highlight">${displayedRisks}</span>. Ngoài ra, chưa thể loại trừ các bệnh xã hội khác.
        </div>
        <div class="gd-results__text">
          Bạn cần xét nghiệm ngay để được chẩn đoán và điều trị sớm.
        </div>
        ${C().dropdown({ html: pathogenInfoHtml })}
        <div class="gd-results__section">
          ${C().sectionTitle('Xét nghiệm gợi ý cho bạn:')}
          ${suggestedTestsHtml}
        </div>
        <div class="gd-results__section gd-text-center">
          <p class="gd-results__text">Chúng tôi luôn sẵn sàng lắng nghe và đồng hành cùng bạn xuyên suốt mọi giai đoạn - tư vấn, chẩn đoán, điều trị và sau điều trị.</p>
          ${C().button({ variant: 'primary', text: 'Tư vấn ngay với chuyên gia', extraClasses: 'gd-mt-4' })}
        </div>
      </div>`;
  }

  function renderSpecialSymptomsResult({ pathogenInfoHtml, test21, test16 }) {
    return `
      <h2 class="gd-results__title">Kết quả đánh giá</h2>
      <div class="gd-results__content">
        <div class="gd-results__text">
          Dựa trên thông tin bạn cung cấp, bạn có nguy cơ cao mắc các bệnh xã hội như là <span class="gd-results__highlight">Lậu</span>, <span class="gd-results__highlight">Chlamydia</span>, <span class="gd-results__highlight">Giang mai</span>, <span class="gd-results__highlight">HIV</span>...
        </div>
        <div class="gd-results__text">
          Tầm soát bệnh xã hội ngay khi có nguy cơ để bảo vệ sức khỏe của bạn. Nếu không được phát hiện và điều trị kịp thời, bệnh có thể dẫn đến tổn thương cơ quan sinh dục, gây vô sinh, và lây lan âm thầm trong cộng đồng.
        </div>
        ${C().dropdown({ html: pathogenInfoHtml })}
        <div class="gd-results__section">
          ${C().sectionTitle('Xét nghiệm gợi ý cho bạn:')}
          ${C().testLink(test21)}
          ${C().divider('Hoặc')}
          ${C().testLink(test16)}
        </div>
        <div class="gd-results__section gd-text-center">
          <p class="gd-results__text">Chúng tôi luôn sẵn sàng lắng nghe và đồng hành cùng bạn xuyên suốt mọi giai đoạn - tư vấn, chẩn đoán, điều trị và sau điều trị.</p>
          ${C().button({ variant: 'primary', text: 'Tư vấn ngay với chuyên gia', extraClasses: 'gd-mt-4' })}
        </div>
      </div>`;
  }

  window.GDViews = window.GDViews || {};
  window.GDViews.results = { renderDiagnosed, renderNoSymptomsRiskFound, renderSymptomResult, renderSpecialSymptomsResult };
})();


