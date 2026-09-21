(function () {
    'use strict';

    const PROFILE_DEFAULTS = { age: '', sex: 'unspecified', activity: 'normal', climate: 'normal', pregnancy: 'none' };
    const TEXT = {
        uk: {
            title: 'Персональна рекомендація', subtitle: 'Орієнтир на день', setup: 'Налаштувати', age: 'Вік, років', sex: 'Стать для розрахунку', unspecified: 'Не вказувати', female: 'Жінка', male: 'Чоловік', activity: 'Активність', normal: 'Звичайна', active: 'Активна / тренування', high: 'Висока / багато поту', climate: 'Умови', mild: 'Звичайна температура', hot: 'Спека або сухе повітря', pregnancy: 'Особливий період', notPregnant: 'Не застосовується', pregnant: 'Вагітність', lactating: 'Грудне вигодовування', save: 'Зберегти рекомендацію', cancel: 'Скасувати', ageHint: 'Для дітей та підлітків ціль відрізняється від дорослої.', profileHint: 'Це орієнтир для здорової людини. Вода з їжі також враховується в добовій потребі.', sourceHint: 'База: EFSA та NHS. Потреба зростає у спеку й під час активності.', medicalHint: 'Якщо лікар обмежив рідину або є хвороби серця, нирок чи печінки — дотримуйся його рекомендацій.', saved: 'Персональну рекомендацію збережено.', noProfile: 'Вкажи вік і умови, щоб отримати точніший орієнтир.', daily: 'на день', current: 'Поточна ціль', short: 'До орієнтира ще', over: 'Понад орієнтир на', onTrack: 'Ти в межах орієнтира', tips: 'Корисно', tipSpread: 'Пий невеликими порціями протягом дня, а не все одразу.', tipUrine: 'Блідо-жовтий колір сечі зазвичай свідчить про достатню гідратацію.', tipDrinks: 'Вода — найпростіший вибір; солодкі напої краще обмежувати.', tipDoctor: 'При блюванні, діареї, високій температурі або сильному тренуванні потреба може змінюватися.', info: 'Рекомендації не замінюють консультацію лікаря.'
        },
        en: {
            title: 'Personal recommendation', subtitle: 'Daily guide', setup: 'Set up', age: 'Age, years', sex: 'Sex for calculation', unspecified: 'Not specified', female: 'Female', male: 'Male', activity: 'Activity', normal: 'Usual', active: 'Active / training', high: 'High / heavy sweating', climate: 'Conditions', mild: 'Usual temperature', hot: 'Hot or dry air', pregnancy: 'Special period', notPregnant: 'Not applicable', pregnant: 'Pregnancy', lactating: 'Breastfeeding', save: 'Save recommendation', cancel: 'Cancel', ageHint: 'Children and teens have different reference values from adults.', profileHint: 'This is a guide for a healthy person. Water from food also contributes to daily needs.', sourceHint: 'Based on EFSA and NHS guidance. Needs rise with heat and activity.', medicalHint: 'If a clinician has limited your fluids or you have heart, kidney, or liver disease, follow their advice.', saved: 'Personal recommendation saved.', noProfile: 'Add your age and conditions for a more tailored guide.', daily: 'per day', current: 'Current goal', short: 'Still to guide', over: 'Above guide by', onTrack: 'You are within the guide', tips: 'Helpful', tipSpread: 'Sip regularly through the day instead of drinking a large amount at once.', tipUrine: 'Pale-yellow urine is generally a useful sign of adequate hydration.', tipDrinks: 'Water is the simplest choice; limit sugary drinks.', tipDoctor: 'Vomiting, diarrhoea, fever, or intense exercise can change your needs.', info: 'This guide does not replace medical advice.'
        },
        es: {
            title: 'Recomendación personal', subtitle: 'Orientación diaria', setup: 'Configurar', age: 'Edad, años', sex: 'Sexo para el cálculo', unspecified: 'Sin especificar', female: 'Mujer', male: 'Hombre', activity: 'Actividad', normal: 'Habitual', active: 'Activa / entrenamiento', high: 'Alta / mucha sudoración', climate: 'Condiciones', mild: 'Temperatura habitual', hot: 'Calor o aire seco', pregnancy: 'Periodo especial', notPregnant: 'No corresponde', pregnant: 'Embarazo', lactating: 'Lactancia', save: 'Guardar recomendación', cancel: 'Cancelar', ageHint: 'Los niños y adolescentes tienen valores de referencia diferentes.', profileHint: 'Es una guía para una persona sana. El agua de los alimentos también cuenta.', sourceHint: 'Basado en EFSA y NHS. La necesidad aumenta con calor y actividad.', medicalHint: 'Si un profesional ha limitado tus líquidos o tienes enfermedad cardíaca, renal o hepática, sigue sus indicaciones.', saved: 'Recomendación personal guardada.', noProfile: 'Añade tu edad y condiciones para una guía más personalizada.', daily: 'al día', current: 'Objetivo actual', short: 'Falta para la guía', over: 'Por encima de la guía', onTrack: 'Estás dentro de la guía', tips: 'Útil', tipSpread: 'Bebe pequeñas cantidades durante el día, no todo de una vez.', tipUrine: 'La orina amarillo pálido suele indicar una hidratación adecuada.', tipDrinks: 'El agua es la opción más sencilla; limita las bebidas azucaradas.', tipDoctor: 'Los vómitos, la diarrea, la fiebre o el ejercicio intenso pueden cambiar tus necesidades.', info: 'Esta guía no sustituye el consejo médico.'
        },
        fr: {
            title: 'Recommandation personnelle', subtitle: 'Repère quotidien', setup: 'Configurer', age: 'Âge, années', sex: 'Sexe pour le calcul', unspecified: 'Non précisé', female: 'Femme', male: 'Homme', activity: 'Activité', normal: 'Habituelle', active: 'Active / entraînement', high: 'Élevée / forte transpiration', climate: 'Conditions', mild: 'Température habituelle', hot: 'Chaleur ou air sec', pregnancy: 'Période particulière', notPregnant: 'Sans objet', pregnant: 'Grossesse', lactating: 'Allaitement', save: 'Enregistrer', cancel: 'Annuler', ageHint: 'Les enfants et adolescents ont des valeurs de référence différentes.', profileHint: 'C’est un repère pour une personne en bonne santé. L’eau des aliments compte aussi.', sourceHint: 'Basé sur les recommandations EFSA et NHS. Le besoin augmente avec chaleur et activité.', medicalHint: 'Si un professionnel limite vos liquides ou en cas de maladie cardiaque, rénale ou hépatique, suivez ses consignes.', saved: 'Recommandation personnelle enregistrée.', noProfile: 'Ajoutez votre âge et vos conditions pour un repère plus personnalisé.', daily: 'par jour', current: 'Objectif actuel', short: 'Encore pour le repère', over: 'Au-dessus du repère de', onTrack: 'Vous êtes dans le repère', tips: 'Utile', tipSpread: 'Buvez régulièrement en petites quantités plutôt qu’un grand volume d’un coup.', tipUrine: 'Une urine jaune pâle indique généralement une hydratation suffisante.', tipDrinks: 'L’eau est le choix le plus simple ; limitez les boissons sucrées.', tipDoctor: 'Vomissements, diarrhée, fièvre ou exercice intense peuvent modifier le besoin.', info: 'Ce repère ne remplace pas un avis médical.'
        }
    };

    let readyAttempts = 0;
    let modal = null;

    function lang() { return window.diaryApp?.getData?.().settings?.language || 'uk'; }
    function t(key) { return (TEXT[lang()] || TEXT.uk)[key] || TEXT.uk[key] || key; }
    function esc(value) { return String(value ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;'); }
    function getProfile() {
        const saved = window.diaryFeatures?.getSettings?.()?.waterProfile;
        return { ...PROFILE_DEFAULTS, ...(saved && typeof saved === 'object' ? saved : {}) };
    }
    function saveProfile(profile) {
        const settings = window.diaryFeatures?.getSettings?.() || {};
        window.diaryFeatures?.setSettings?.({ ...settings, waterProfile: profile });
    }
    function calculate(profile) {
        const age = Number(profile.age);
        const sex = ['female', 'male'].includes(profile.sex) ? profile.sex : 'unspecified';
        let goal = 2000;
        let basis = 'adult';
        if (age >= 2 && age <= 3) { goal = 1300; basis = 'child'; }
        else if (age >= 4 && age <= 8) { goal = 1600; basis = 'child'; }
        else if (age >= 9 && age <= 13) { goal = sex === 'male' ? 2100 : sex === 'female' ? 1900 : 2000; basis = 'child'; }
        else if (age >= 14) goal = sex === 'male' ? 2500 : sex === 'female' ? 2000 : 2250;
        if (age >= 14 && profile.pregnancy === 'pregnant') goal += 300;
        if (age >= 14 && profile.pregnancy === 'lactating') goal += 700;
        if (profile.activity === 'active') goal += 300;
        if (profile.activity === 'high') goal += 500;
        if (profile.climate === 'hot') goal += 300;
        return { goal: Math.round(goal / 100) * 100, basis };
    }
    function formatMl(value) { return new Intl.NumberFormat(lang() === 'uk' ? 'uk-UA' : lang() === 'es' ? 'es-ES' : lang() === 'fr' ? 'fr-FR' : 'en-US').format(value); }
    function todayKey() {
        const date = new Date();
        return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
    }
    function ensureAdvice() {
        const card = document.querySelector('#tab-health .card-grid > .card:first-child');
        if (!card || document.getElementById('water-recommendation')) return;
        const advice = document.createElement('div');
        advice.id = 'water-recommendation';
        advice.className = 'water-recommendation';
        card.querySelector('.progress')?.after(advice);
    }
    function ensureModal() {
        if (modal) return;
        modal = document.createElement('div');
        modal.id = 'water-profile-modal';
        modal.className = 'modal-backdrop water-profile-modal';
        document.body.appendChild(modal);
        renderModal();
        modal.addEventListener('click', event => { if (event.target === modal) modal.classList.remove('active'); });
        document.addEventListener('keydown', event => { if (event.key === 'Escape') modal?.classList.remove('active'); });
    }
    function renderModal() {
        if (!modal) return;
        const profile = getProfile();
        modal.innerHTML = `<div class="modal" role="dialog" aria-modal="true" aria-labelledby="water-profile-title"><div class="modal-head"><div class="modal-title" id="water-profile-title">${esc(t('title'))}</div><button class="modal-close" type="button" data-water-action="close" aria-label="${esc(t('cancel'))}">×</button></div><p class="modal-copy">${esc(t('profileHint'))}</p><form id="water-profile-form"><div class="water-profile-grid"><div><label class="form-label" for="water-profile-age">${esc(t('age'))}</label><input class="input" id="water-profile-age" name="age" type="number" min="2" max="120" inputmode="numeric" value="${esc(profile.age)}" placeholder="30"></div><div><label class="form-label" for="water-profile-sex">${esc(t('sex'))}</label><select class="select" id="water-profile-sex" name="sex"><option value="unspecified" ${profile.sex === 'unspecified' ? 'selected' : ''}>${esc(t('unspecified'))}</option><option value="female" ${profile.sex === 'female' ? 'selected' : ''}>${esc(t('female'))}</option><option value="male" ${profile.sex === 'male' ? 'selected' : ''}>${esc(t('male'))}</option></select></div><div><label class="form-label" for="water-profile-activity">${esc(t('activity'))}</label><select class="select" id="water-profile-activity" name="activity"><option value="normal" ${profile.activity === 'normal' ? 'selected' : ''}>${esc(t('normal'))}</option><option value="active" ${profile.activity === 'active' ? 'selected' : ''}>${esc(t('active'))}</option><option value="high" ${profile.activity === 'high' ? 'selected' : ''}>${esc(t('high'))}</option></select></div><div><label class="form-label" for="water-profile-climate">${esc(t('climate'))}</label><select class="select" id="water-profile-climate" name="climate"><option value="normal" ${profile.climate === 'normal' ? 'selected' : ''}>${esc(t('mild'))}</option><option value="hot" ${profile.climate === 'hot' ? 'selected' : ''}>${esc(t('hot'))}</option></select></div><div class="wide"><label class="form-label" for="water-profile-pregnancy">${esc(t('pregnancy'))}</label><select class="select" id="water-profile-pregnancy" name="pregnancy"><option value="none" ${profile.pregnancy === 'none' ? 'selected' : ''}>${esc(t('notPregnant'))}</option><option value="pregnant" ${profile.pregnancy === 'pregnant' ? 'selected' : ''}>${esc(t('pregnant'))}</option><option value="lactating" ${profile.pregnancy === 'lactating' ? 'selected' : ''}>${esc(t('lactating'))}</option></select></div></div><div class="water-profile-note">${esc(t('ageHint'))}<br>${esc(t('sourceHint'))}<br>${esc(t('medicalHint'))}</div><div class="modal-actions"><button class="btn" type="button" data-water-action="close">${esc(t('cancel'))}</button><button class="btn btn-primary" type="submit">${esc(t('save'))}</button></div></form></div>`;
        modal.querySelector('#water-profile-form').addEventListener('submit', event => { event.preventDefault(); const form = event.currentTarget; const profile = { age: form.age.value ? Math.max(2, Math.min(120, Number(form.age.value))) : '', sex: form.sex.value, activity: form.activity.value, climate: form.climate.value, pregnancy: form.pregnancy.value }; const recommendation = calculate(profile); saveProfile(profile); const data = window.diaryApp?.getData?.(); if (data?.health) data.health.waterGoal = recommendation.goal; window.diaryApp?.save?.({ sync: true }); window.diaryApp?.render?.(); modal.classList.remove('active'); window.diaryApp?.toast?.(t('saved'), 'success'); });
        modal.querySelectorAll('[data-water-action="close"]').forEach(button => button.addEventListener('click', () => modal.classList.remove('active')));
    }
    function openModal() { ensureModal(); renderModal(); modal.classList.add('active'); modal.querySelector('#water-profile-age')?.focus(); }
    function renderAdvice() {
        ensureAdvice();
        const advice = document.getElementById('water-recommendation');
        if (!advice) return;
        const profile = getProfile();
        const result = calculate(profile);
        const data = window.diaryApp?.getData?.();
        const current = Number(data?.health?.waterHistory?.[todayKey()] || 0);
        const difference = result.goal - current;
        const status = difference > 0 ? `${t('short')}: ${formatMl(difference)} мл` : difference < 0 ? `${t('over')}: ${formatMl(Math.abs(difference))} мл` : t('onTrack');
        advice.innerHTML = `<div class="water-advice-head"><div><strong>${esc(t('title'))}</strong><span>${esc(t('subtitle'))}</span></div><button class="btn btn-sm" type="button" data-water-action="open">⚙ ${esc(t('setup'))}</button></div><div class="water-advice-value">${formatMl(result.goal)} <small>${esc(t('daily'))}</small></div><div class="water-advice-status">${esc(status)}</div><div class="water-advice-list"><span>• ${esc(t('tipSpread'))}</span><span>• ${esc(t('tipUrine'))}</span><span>• ${esc(t('tipDrinks'))}</span></div><div class="water-advice-foot">${esc(t('profileHint'))} ${esc(t('info'))}</div></div>`;
        advice.querySelector('[data-water-action="open"]').addEventListener('click', openModal);
    }
    function init() {
        if (!window.diaryApp?.getData || !window.diaryFeatures?.getSettings) { if (readyAttempts++ < 30) setTimeout(init, 250); return; }
        ensureModal();
        document.addEventListener('click', event => { const action = event.target.closest('[data-water-action]')?.dataset.waterAction; if (action === 'open') openModal(); else if (action === 'close') modal?.classList.remove('active'); });
        document.addEventListener('diary-data-changed', renderAdvice);
        document.addEventListener('diary-language-changed', () => { renderModal(); renderAdvice(); });
        renderAdvice();
    }
    init();
})();
