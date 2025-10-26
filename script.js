// Global state
let uploadedFile = null;
let compressedSize = 0;

// --- i18n Setup ---
const LANG_KEY = 'app:lang';
const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
    { code: 'zh', name: '中文', flag: '🇨🇳' },
    { code: 'ar', name: 'العربية', flag: '🇸🇦' },
    { code: 'ru', name: 'Русский', flag: '🇷🇺' },
    { code: 'pt', name: 'Português', flag: '🇵🇹' },
    { code: 'hi', name: 'हिन्दी', flag: '🇮🇳' },
    { code: 'ja', name: '日本語', flag: '🇯🇵' },
];

const translations = {
    en: {
        'ui.lang': 'Language',
        'ui.title': 'One-Click File Optimizer',
        'ui.subtitle': 'PDF, DOCX, PPTX, Images, and more. Upload, set your target size, and compress.',
        'ui.drop': 'Drag & Drop or <span class="text-violet-600 hover:text-violet-800 transition">Browse Files</span>',
        'ui.supported': 'Supported: PDF, DOCX, PPTX, JPG, PNG, up to 50MB',
        'ui.fileLoaded': 'File Loaded:',
        'ui.originalSize': 'Original Size',
        'ui.fileType': 'File Type',
        'ui.desiredSize': 'Desired Output Size (MB):',
        'ui.desiredSize.placeholder': 'e.g., 1.5',
        'ui.desiredSize.help': 'Enter the maximum size you want the compressed file to be.',
        'ui.simulateButton': 'Simulate Compression',
        'ui.result.title': 'Compression Complete!',
        'ui.result.original': 'Original',
        'ui.result.compressed': 'Compressed',
        'ui.result.reduction': 'Reduction',
        'ui.download': 'Download Compressed File',
        'ui.compressAnother': 'Compress Another File',
        'ui.loading.title': 'Compressing File... (Simulation in progress)',
        'ui.loading.subtitle': 'This would be the real-time server step in production.',
        'ui.modal.close': 'Close',
        'modal.inputError.title': 'Input Error',
        'modal.inputError.body': 'Please enter a valid target size greater than zero.',
        'modal.warning.title': 'Compression Warning',
        'modal.warning.body': 'The target size you set is larger than or equal to the original file size. A minor optimization will be simulated, but for best results, aim for a smaller size.',
        'modal.downloadError.title': 'Download Error',
        'modal.downloadError.body': 'No compressed file is ready for download.',
        'modal.downloadStarted.title': 'Download Initiated',
        'modal.downloadStarted.body': 'The browser is downloading a simulated version named: <strong>{name}</strong>.<br>In a real-world production app, this file would be the optimized size ({size}).',
    },
    es: {
        'ui.lang': 'Idioma',
        'ui.title': 'Optimizador de Archivos en Un Clic',
        'ui.subtitle': 'PDF, DOCX, PPTX, Imágenes y más. Sube, define el tamaño objetivo y comprime.',
        'ui.drop': 'Arrastra y suelta o <span class="text-violet-600 hover:text-violet-800 transition">Explorar archivos</span>',
        'ui.supported': 'Compatibles: PDF, DOCX, PPTX, JPG, PNG, hasta 50MB',
        'ui.fileLoaded': 'Archivo cargado:',
        'ui.originalSize': 'Tamaño original',
        'ui.fileType': 'Tipo de archivo',
        'ui.desiredSize': 'Tamaño de salida deseado (MB):',
        'ui.desiredSize.placeholder': 'p. ej., 1.5',
        'ui.desiredSize.help': 'Introduce el tamaño máximo que deseas para el archivo comprimido.',
        'ui.simulateButton': 'Simular compresión',
        'ui.result.title': '¡Compresión completada!',
        'ui.result.original': 'Original',
        'ui.result.compressed': 'Comprimido',
        'ui.result.reduction': 'Reducción',
        'ui.download': 'Descargar archivo comprimido',
        'ui.compressAnother': 'Comprimir otro archivo',
        'ui.loading.title': 'Comprimiendo archivo... (Simulación en curso)',
        'ui.loading.subtitle': 'Esto sería el paso del servidor en producción.',
        'ui.modal.close': 'Cerrar',
        'modal.inputError.title': 'Error de entrada',
        'modal.inputError.body': 'Introduce un tamaño objetivo válido mayor que cero.',
        'modal.warning.title': 'Advertencia de compresión',
        'modal.warning.body': 'El tamaño objetivo es mayor o igual que el archivo original. Se simulará una optimización mínima; para mejores resultados, usa un tamaño menor.',
        'modal.downloadError.title': 'Error de descarga',
        'modal.downloadError.body': 'No hay un archivo comprimido listo para descargar.',
        'modal.downloadStarted.title': 'Descarga iniciada',
        'modal.downloadStarted.body': 'El navegador está descargando una versión simulada llamada: <strong>{name}</strong>.<br>En producción, este archivo tendría el tamaño optimizado ({size}).',
    },
    fr: {
        'ui.lang': 'Langue',
        'ui.title': 'Optimiseur de fichiers en un clic',
        'ui.subtitle': 'PDF, DOCX, PPTX, images, etc. Téléversez, définissez la taille cible et compressez.',
        'ui.drop': 'Glisser-déposer ou <span class="text-violet-600 hover:text-violet-800 transition">Parcourir les fichiers</span>',
        'ui.supported': 'Pris en charge : PDF, DOCX, PPTX, JPG, PNG, jusqu’à 50 Mo',
        'ui.fileLoaded': 'Fichier chargé :',
        'ui.originalSize': 'Taille d’origine',
        'ui.fileType': 'Type de fichier',
        'ui.desiredSize': 'Taille de sortie souhaitée (Mo) :',
        'ui.desiredSize.placeholder': 'ex. : 1,5',
        'ui.desiredSize.help': 'Entrez la taille maximale souhaitée pour le fichier compressé.',
        'ui.simulateButton': 'Simuler la compression',
        'ui.result.title': 'Compression terminée !',
        'ui.result.original': 'Original',
        'ui.result.compressed': 'Compressé',
        'ui.result.reduction': 'Réduction',
        'ui.download': 'Télécharger le fichier compressé',
        'ui.compressAnother': 'Compresser un autre fichier',
        'ui.loading.title': 'Compression du fichier... (Simulation en cours)',
        'ui.loading.subtitle': 'Ceci serait l’étape côté serveur en production.',
        'ui.modal.close': 'Fermer',
        'modal.inputError.title': 'Erreur de saisie',
        'modal.inputError.body': 'Veuillez entrer une taille cible valide supérieure à zéro.',
        'modal.warning.title': 'Avertissement de compression',
        'modal.warning.body': 'La taille cible est supérieure ou égale à la taille d’origine. Une légère optimisation sera simulée ; pour de meilleurs résultats, visez plus petit.',
        'modal.downloadError.title': 'Erreur de téléchargement',
        'modal.downloadError.body': 'Aucun fichier compressé prêt à être téléchargé.',
        'modal.downloadStarted.title': 'Téléchargement lancé',
        'modal.downloadStarted.body': 'Le navigateur télécharge une version simulée nommée : <strong>{name}</strong>.<br>En production, ce fichier aurait la taille optimisée ({size}).',
    },
    de: {
        'ui.lang': 'Sprache',
        'ui.title': 'Dateioptimierer mit einem Klick',
        'ui.subtitle': 'PDF, DOCX, PPTX, Bilder und mehr. Hochladen, Zielgröße festlegen und komprimieren.',
        'ui.drop': 'Ziehen & Ablegen oder <span class="text-violet-600 hover:text-violet-800 transition">Dateien durchsuchen</span>',
        'ui.supported': 'Unterstützt: PDF, DOCX, PPTX, JPG, PNG, bis 50 MB',
        'ui.fileLoaded': 'Datei geladen:',
        'ui.originalSize': 'Ursprüngliche Größe',
        'ui.fileType': 'Dateityp',
        'ui.desiredSize': 'Gewünschte Ausgabengröße (MB):',
        'ui.desiredSize.placeholder': 'z. B. 1,5',
        'ui.desiredSize.help': 'Geben Sie die maximale gewünschte Größe der komprimierten Datei ein.',
        'ui.simulateButton': 'Kompression simulieren',
        'ui.result.title': 'Kompression abgeschlossen!',
        'ui.result.original': 'Original',
        'ui.result.compressed': 'Komprimiert',
        'ui.result.reduction': 'Reduktion',
        'ui.download': 'Komprimierte Datei herunterladen',
        'ui.compressAnother': 'Weitere Datei komprimieren',
        'ui.loading.title': 'Datei wird komprimiert... (Simulation)',
        'ui.loading.subtitle': 'Dies wäre in Produktion der Serverschritt.',
        'ui.modal.close': 'Schließen',
        'modal.inputError.title': 'Eingabefehler',
        'modal.inputError.body': 'Bitte geben Sie eine gültige Zielgröße größer als Null ein.',
        'modal.warning.title': 'Kompressionswarnung',
        'modal.warning.body': 'Die Zielgröße ist größer oder gleich der Originalgröße. Eine leichte Optimierung wird simuliert; für bessere Ergebnisse kleiner ansetzen.',
        'modal.downloadError.title': 'Download-Fehler',
        'modal.downloadError.body': 'Keine komprimierte Datei zum Herunterladen bereit.',
        'modal.downloadStarted.title': 'Download gestartet',
        'modal.downloadStarted.body': 'Der Browser lädt eine simulierte Version namens: <strong>{name}</strong> herunter.<br>In Produktion hätte diese Datei die optimierte Größe ({size}).',
    },
    zh: {
        'ui.lang': '语言',
        'ui.title': '一键文件优化器',
        'ui.subtitle': '支持 PDF、DOCX、PPTX、图片等。上传、设置目标大小并压缩。',
        'ui.drop': '拖放或 <span class="text-violet-600 hover:text-violet-800 transition">浏览文件</span>',
        'ui.supported': '支持：PDF、DOCX、PPTX、JPG、PNG，最大 50MB',
        'ui.fileLoaded': '已加载文件：',
        'ui.originalSize': '原始大小',
        'ui.fileType': '文件类型',
        'ui.desiredSize': '期望输出大小（MB）：',
        'ui.desiredSize.placeholder': '例如 1.5',
        'ui.desiredSize.help': '输入你希望压缩后文件的最大大小。',
        'ui.simulateButton': '模拟压缩',
        'ui.result.title': '压缩完成！',
        'ui.result.original': '原始',
        'ui.result.compressed': '已压缩',
        'ui.result.reduction': '减少量',
        'ui.download': '下载压缩文件',
        'ui.compressAnother': '压缩另一个文件',
        'ui.loading.title': '正在压缩文件…（模拟进行中）',
        'ui.loading.subtitle': '在生产环境中，此步骤由服务器完成。',
        'ui.modal.close': '关闭',
        'modal.inputError.title': '输入错误',
        'modal.inputError.body': '请输入大于零的有效目标大小。',
        'modal.warning.title': '压缩警告',
        'modal.warning.body': '你设置的目标大小大于或等于原始文件大小。将模拟轻微优化；为获得更好效果，请设定更小的大小。',
        'modal.downloadError.title': '下载错误',
        'modal.downloadError.body': '没有可下载的压缩文件。',
        'modal.downloadStarted.title': '开始下载',
        'modal.downloadStarted.body': '浏览器正在下载名为 <strong>{name}</strong> 的模拟版本。<br>在生产中，该文件将为优化后的大小（{size}）。',
    },
    ar: {
        'ui.lang': 'اللغة',
        'ui.title': 'محسّن الملفات بنقرة واحدة',
        'ui.subtitle': 'PDF وDOCX وPPTX وصور أخرى. ارفع الملف وحدد الحجم المطلوب ثم اضغط ضغط.',
        'ui.drop': 'اسحب وأفلت أو <span class="text-violet-600 hover:text-violet-800 transition">تصفح الملفات</span>',
        'ui.supported': 'المدعوم: PDF وDOCX وPPTX وJPG وPNG حتى 50MB',
        'ui.fileLoaded': 'تم تحميل الملف:',
        'ui.originalSize': 'الحجم الأصلي',
        'ui.fileType': 'نوع الملف',
        'ui.desiredSize': 'الحجم المطلوب (MB):',
        'ui.desiredSize.placeholder': 'مثال: 1.5',
        'ui.desiredSize.help': 'أدخل الحد الأقصى للحجم الذي تريده بعد الضغط.',
        'ui.simulateButton': 'محاكاة الضغط',
        'ui.result.title': 'اكتمل الضغط!',
        'ui.result.original': 'الأصلي',
        'ui.result.compressed': 'بعد الضغط',
        'ui.result.reduction': 'النقصان',
        'ui.download': 'تحميل الملف المضغوط',
        'ui.compressAnother': 'ضغط ملف آخر',
        'ui.loading.title': 'جارٍ ضغط الملف... (محاكاة)',
        'ui.loading.subtitle': 'في الإنتاج، تكون هذه الخطوة على الخادم.',
        'ui.modal.close': 'إغلاق',
        'modal.inputError.title': 'خطأ في الإدخال',
        'modal.inputError.body': 'يرجى إدخال حجم هدف صالح أكبر من صفر.',
        'modal.warning.title': 'تحذير الضغط',
        'modal.warning.body': 'الحجم الهدف أكبر من أو يساوي الحجم الأصلي. سيتم محاكاة تحسين بسيط؛ للحصول على نتائج أفضل اختر حجماً أصغر.',
        'modal.downloadError.title': 'خطأ في التنزيل',
        'modal.downloadError.body': 'لا يوجد ملف مضغوط جاهز للتنزيل.',
        'modal.downloadStarted.title': 'بدأ التنزيل',
        'modal.downloadStarted.body': 'يقوم المتصفح بتنزيل نسخة محاكاة باسم: <strong>{name}</strong>.<br>في الإنتاج سيكون الملف بالحجم المُحسّن ({size}).',
    },
    ru: {
        'ui.lang': 'Язык',
        'ui.title': 'Оптимизатор файлов в один клик',
        'ui.subtitle': 'PDF, DOCX, PPTX, изображения и др. Загрузите, задайте целевой размер и сжимайте.',
        'ui.drop': 'Перетащите файл или <span class="text-violet-600 hover:text-violet-800 transition">выберите файлы</span>',
        'ui.supported': 'Поддерживается: PDF, DOCX, PPTX, JPG, PNG, до 50 МБ',
        'ui.fileLoaded': 'Файл загружен:',
        'ui.originalSize': 'Исходный размер',
        'ui.fileType': 'Тип файла',
        'ui.desiredSize': 'Желаемый размер (МБ):',
        'ui.desiredSize.placeholder': 'напр., 1.5',
        'ui.desiredSize.help': 'Укажите максимальный размер сжатого файла.',
        'ui.simulateButton': 'Симулировать сжатие',
        'ui.result.title': 'Сжатие завершено!',
        'ui.result.original': 'Исходный',
        'ui.result.compressed': 'Сжатый',
        'ui.result.reduction': 'Уменьшение',
        'ui.download': 'Скачать сжатый файл',
        'ui.compressAnother': 'Сжать другой файл',
        'ui.loading.title': 'Сжатие файла... (симуляция)',
        'ui.loading.subtitle': 'В проде этот шаг выполняет сервер.',
        'ui.modal.close': 'Закрыть',
        'modal.inputError.title': 'Ошибка ввода',
        'modal.inputError.body': 'Введите корректный целевой размер больше нуля.',
        'modal.warning.title': 'Предупреждение о сжатии',
        'modal.warning.body': 'Целевой размер больше либо равен исходному. Будет имитировано небольшое улучшение; для лучшего результата выберите меньший размер.',
        'modal.downloadError.title': 'Ошибка загрузки',
        'modal.downloadError.body': 'Нет готового к скачиванию сжатого файла.',
        'modal.downloadStarted.title': 'Загрузка начата',
        'modal.downloadStarted.body': 'Браузер скачивает симулированную версию с именем: <strong>{name}</strong>.<br>В проде файл был бы оптимизированного размера ({size}).',
    },
    pt: {
        'ui.lang': 'Idioma',
        'ui.title': 'Otimizador de Arquivos com Um Clique',
        'ui.subtitle': 'PDF, DOCX, PPTX, imagens e muito mais. Envie, defina o tamanho alvo e comprima.',
        'ui.drop': 'Arraste e solte ou <span class="text-violet-600 hover:text-violet-800 transition">Procurar arquivos</span>',
        'ui.supported': 'Compatíveis: PDF, DOCX, PPTX, JPG, PNG, até 50MB',
        'ui.fileLoaded': 'Arquivo carregado:',
        'ui.originalSize': 'Tamanho original',
        'ui.fileType': 'Tipo de arquivo',
        'ui.desiredSize': 'Tamanho de saída desejado (MB):',
        'ui.desiredSize.placeholder': 'ex.: 1,5',
        'ui.desiredSize.help': 'Informe o tamanho máximo desejado do arquivo compactado.',
        'ui.simulateButton': 'Simular compactação',
        'ui.result.title': 'Compactação concluída!',
        'ui.result.original': 'Original',
        'ui.result.compressed': 'Compactado',
        'ui.result.reduction': 'Redução',
        'ui.download': 'Baixar arquivo compactado',
        'ui.compressAnother': 'Compactar outro arquivo',
        'ui.loading.title': 'Compactando arquivo... (Simulação)',
        'ui.loading.subtitle': 'Em produção, esta etapa seria no servidor.',
        'ui.modal.close': 'Fechar',
        'modal.inputError.title': 'Erro de entrada',
        'modal.inputError.body': 'Insira um tamanho alvo válido maior que zero.',
        'modal.warning.title': 'Aviso de compactação',
        'modal.warning.body': 'O tamanho alvo é maior ou igual ao tamanho original. Uma leve otimização será simulada; para melhores resultados, use um tamanho menor.',
        'modal.downloadError.title': 'Erro de download',
        'modal.downloadError.body': 'Nenhum arquivo compactado pronto para download.',
        'modal.downloadStarted.title': 'Download iniciado',
        'modal.downloadStarted.body': 'O navegador está baixando uma versão simulada chamada: <strong>{name}</strong>.<br>No ambiente de produção, este arquivo teria o tamanho otimizado ({size}).',
    },
    hi: {
        'ui.lang': 'भाषा',
        'ui.title': 'वन-क्लिक फ़ाइल ऑप्टिमाइज़र',
        'ui.subtitle': 'PDF, DOCX, PPTX, इमेज आदि। अपलोड करें, लक्ष्य आकार सेट करें और कंप्रेस करें।',
        'ui.drop': 'ड्रैग और ड्रॉप करें या <span class="text-violet-600 hover:text-violet-800 transition">फाइल ब्राउज़ करें</span>',
        'ui.supported': 'समर्थित: PDF, DOCX, PPTX, JPG, PNG, 50MB तक',
        'ui.fileLoaded': 'फ़ाइल लोड हो गई:',
        'ui.originalSize': 'मूल आकार',
        'ui.fileType': 'फ़ाइल प्रकार',
        'ui.desiredSize': 'वांछित आउटपुट आकार (MB):',
        'ui.desiredSize.placeholder': 'उदा., 1.5',
        'ui.desiredSize.help': 'कंप्रेस्ड फ़ाइल के लिए अधिकतम आकार दर्ज करें।',
        'ui.simulateButton': 'कंप्रेशन सिमुलेट करें',
        'ui.result.title': 'कंप्रेशन पूर्ण!',
        'ui.result.original': 'मूल',
        'ui.result.compressed': 'कंप्रेस्ड',
        'ui.result.reduction': 'कमी',
        'ui.download': 'कंप्रेस्ड फ़ाइल डाउनलोड करें',
        'ui.compressAnother': 'एक और फ़ाइल कंप्रेस करें',
        'ui.loading.title': 'फ़ाइल कंप्रेस हो रही है... (सिमुलेशन)',
        'ui.loading.subtitle': 'प्रोडक्शन में यह सर्वर की स्टेप होगी।',
        'ui.modal.close': 'बंद करें',
        'modal.inputError.title': 'इनपुट त्रुटि',
        'modal.inputError.body': 'कृपया शून्य से अधिक मान्य लक्ष्य आकार दर्ज करें।',
        'modal.warning.title': 'कंप्रेशन चेतावनी',
        'modal.warning.body': 'लक्ष्य आकार मूल आकार से बड़ा या बराबर है। हल्का अनुकूलन सिमुलेट किया जाएगा; बेहतर परिणाम के लिए छोटा आकार चुनें।',
        'modal.downloadError.title': 'डाउनलोड त्रुटि',
        'modal.downloadError.body': 'डाउनलोड के लिए कोई कंप्रेस्ड फ़ाइल तैयार नहीं है।',
        'modal.downloadStarted.title': 'डाउनलोड शुरू',
        'modal.downloadStarted.body': 'ब्राउज़र <strong>{name}</strong> नाम का सिमुलेटेड संस्करण डाउनलोड कर रहा है।<br>प्रोडक्शन में, यह फ़ाइल अनुकूलित आकार ({size}) की होगी।',
    },
    ja: {
        'ui.lang': '言語',
        'ui.title': 'ワンクリック・ファイル最適化',
        'ui.subtitle': 'PDF、DOCX、PPTX、画像など。アップロードして目標サイズを設定し、圧縮します。',
        'ui.drop': 'ドラッグ＆ドロップ または <span class="text-violet-600 hover:text-violet-800 transition">ファイルを選択</span>',
        'ui.supported': '対応: PDF, DOCX, PPTX, JPG, PNG、最大50MB',
        'ui.fileLoaded': '読み込まれたファイル:',
        'ui.originalSize': '元のサイズ',
        'ui.fileType': 'ファイル形式',
        'ui.desiredSize': '希望出力サイズ（MB）:',
        'ui.desiredSize.placeholder': '例: 1.5',
        'ui.desiredSize.help': '圧縮後の最大サイズを入力してください。',
        'ui.simulateButton': '圧縮をシミュレーション',
        'ui.result.title': '圧縮が完了しました！',
        'ui.result.original': '元',
        'ui.result.compressed': '圧縮後',
        'ui.result.reduction': '削減率',
        'ui.download': '圧縮ファイルをダウンロード',
        'ui.compressAnother': '別のファイルを圧縮',
        'ui.loading.title': 'ファイルを圧縮中…（シミュレーション）',
        'ui.loading.subtitle': '本番ではこの処理はサーバー側で行われます。',
        'ui.modal.close': '閉じる',
        'modal.inputError.title': '入力エラー',
        'modal.inputError.body': '0 より大きい有効な目標サイズを入力してください。',
        'modal.warning.title': '圧縮に関する注意',
        'modal.warning.body': '目標サイズが元のファイルサイズ以上です。わずかな最適化のみをシミュレートします。より良い結果のためには、小さいサイズを設定してください。',
        'modal.downloadError.title': 'ダウンロードエラー',
        'modal.downloadError.body': 'ダウンロードできる圧縮ファイルがありません。',
        'modal.downloadStarted.title': 'ダウンロード開始',
        'modal.downloadStarted.body': 'ブラウザが <strong>{name}</strong> というシミュレート版をダウンロードしています。<br>本番では、最適化サイズ（{size}）のファイルになります。',
    },
};

let currentLang = 'en';

function t(key) {
    const dict = translations[currentLang] || translations.en;
    return (dict && dict[key]) || translations.en[key] || '';
}
function tReplace(key, params) {
    let s = t(key);
    Object.keys(params || {}).forEach(k => {
        s = s.replace(new RegExp('\{' + k + '\}', 'g'), params[k]);
    });
    return s;
}

function getSystemLang() {
    const saved = localStorage.getItem(LANG_KEY);
    if (saved && translations[saved]) return saved;
    const navLangs = (navigator.languages || [navigator.language || 'en']).map(l => l.split('-')[0]);
    const match = navLangs.find(code => translations[code]);
    return match || 'en';
}

function applyTranslations(code) {
    currentLang = translations[code] ? code : 'en';
    document.documentElement.setAttribute('dir', currentLang === 'ar' ? 'rtl' : 'ltr');
    // Text content/HTML
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        const val = t(key);
        if (val) el.innerHTML = val;
    });
    // Placeholders
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        const val = t(key);
        if (val) el.setAttribute('placeholder', val);
    });
    updateLangButton();
}

function updateLangButton() {
    const btn = document.getElementById('lang-button');
    const flagSpan = document.getElementById('lang-flag');
    const langMeta = languages.find(l => l.code === currentLang) || languages[0];
    if (flagSpan) flagSpan.textContent = langMeta.flag;
    if (btn) btn.setAttribute('aria-label', `${t('ui.lang')}: ${langMeta.name}`);
}

function populateLangList() {
    const list = document.getElementById('lang-list');
    if (!list) return;
    list.innerHTML = '';
    languages.forEach(lang => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'lang-item-btn';
        btn.innerHTML = `<span class="text-lg">${lang.flag}</span><span>${lang.name}</span>`;
        btn.onclick = () => selectLanguage(lang.code);
        list.appendChild(btn);
    });
}

function selectLanguage(code) {
    const lang = translations[code] ? code : 'en';
    localStorage.setItem(LANG_KEY, lang);
    applyTranslations(lang);
    // Close the flyout
    const selector = document.querySelector('.lang-selector');
    const btn = document.getElementById('lang-button');
    if (selector) selector.classList.remove('open');
    if (btn) btn.setAttribute('aria-expanded', 'false');
}

// Utility function to format bytes into readable units
function formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

// --- File Handling ---

const fileUpload = document.getElementById('file-upload');
const uploadArea = document.querySelector('.cute-upload-area');
        
// Handle file selection change
fileUpload.addEventListener('change', (event) => {
    const files = event.target.files;
    if (files.length > 0) {
        uploadedFile = files[0];
        displayFileDetails();
    }
});

// Handle Drag and Drop
['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
    uploadArea.addEventListener(eventName, preventDefaults, false);
    document.body.addEventListener(eventName, preventDefaults, false);
});

['dragenter', 'dragover'].forEach(eventName => {
    uploadArea.addEventListener(eventName, () => uploadArea.classList.add('active'), false);
});

['dragleave', 'drop'].forEach(eventName => {
    uploadArea.addEventListener(eventName, () => uploadArea.classList.remove('active'), false);
});

uploadArea.addEventListener('drop', (event) => {
    let dt = event.dataTransfer;
    let files = dt.files;
    if (files.length > 0) {
        uploadedFile = files[0];
        displayFileDetails();
    }
}, false);

function preventDefaults (e) {
    e.preventDefault();
    e.stopPropagation();
}


// --- UI Updates ---

function displayFileDetails() {
    if (!uploadedFile) return;

    // Show control section
    document.getElementById('upload-section').classList.add('hidden');
    document.getElementById('control-section').classList.remove('hidden');
    document.getElementById('result-section').classList.add('hidden');
            
    // Populate file info
    document.getElementById('file-name').textContent = uploadedFile.name;
    document.getElementById('original-size').textContent = formatBytes(uploadedFile.size);

    const fileExtension = uploadedFile.name.split('.').pop().toUpperCase();
    document.getElementById('file-type').textContent = fileExtension;

    // Set a realistic default target size (e.g., 50% reduction)
    const defaultTargetSizeMB = Math.max(0.1, (uploadedFile.size / (1024 * 1024) * 0.5)).toFixed(1);
    document.getElementById('target-size').value = defaultTargetSizeMB;
}

// --- Compression Logic (Simulation) ---

async function handleCompression() {
    if (!uploadedFile) return console.error("No file selected.");

    const targetSizeMB = parseFloat(document.getElementById('target-size').value);
    const targetSizeBytes = targetSizeMB * 1024 * 1024;
    const originalSizeBytes = uploadedFile.size;

    if (isNaN(targetSizeMB) || targetSizeMB <= 0) {
        return alertModal(t('modal.inputError.title'), t('modal.inputError.body'));
    }

    if (targetSizeBytes >= originalSizeBytes) {
        alertModal(t('modal.warning.title'), t('modal.warning.body'));
        // Simulate a tiny reduction if target is too high
        compressedSize = originalSizeBytes * 0.98; 
    } else {
        // Ensure the compressed size meets the target, but also has a minimum cap for realism
        const reductionFactor = Math.min(1 - (targetSizeBytes / originalSizeBytes), 0.9); // Cap reduction at 90%
        compressedSize = originalSizeBytes * (1 - reductionFactor);

        // If the target is very low, cap the minimum simulated size at 5% of the original for realism
        const minimumRealisticSize = originalSizeBytes * 0.05;
        compressedSize = Math.max(compressedSize, minimumRealisticSize);
    }
            
    // Start the loading animation
    document.getElementById('loading-overlay').classList.remove('hidden');

    // Simulate server-side processing delay (2 seconds)
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Stop the loading animation
    document.getElementById('loading-overlay').classList.add('hidden');
            
    showResult();
}

function showResult() {
    const originalSize = uploadedFile.size;
    const reduction = originalSize - compressedSize;
    const reductionPercentage = ((reduction / originalSize) * 100).toFixed(1);

    document.getElementById('control-section').classList.add('hidden');
    document.getElementById('result-section').classList.remove('hidden');

    document.getElementById('final-original-size').textContent = formatBytes(originalSize);
    document.getElementById('final-compressed-size').textContent = formatBytes(compressedSize);
    document.getElementById('reduction-percentage').textContent = `${reductionPercentage}%`;
}

function downloadSimulatedFile() {
    if (!uploadedFile || compressedSize === 0) {
        alertModal(t('modal.downloadError.title'), t('modal.downloadError.body'));
        return;
    }

    // In a real application, this is where the server would return the compressed file's URL.
    // We use the original file content for the download but rename it.
    const newFileName = uploadedFile.name.replace(/\.(pdf|docx|pptx|jpg|jpeg|png|zip|rar)$/i, (match, ext) => {
        return `-optimized.${ext}`;
    });
            
    const blob = uploadedFile;
    const url = URL.createObjectURL(blob);
            
    const a = document.createElement('a');
    a.href = url;
    a.download = newFileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    // Clean up
    URL.revokeObjectURL(url);
            
    // Inform the user that the download has started 
    alertModal(
        t('modal.downloadStarted.title'), 
        tReplace('modal.downloadStarted.body', { name: newFileName, size: formatBytes(compressedSize) })
    );
}
        
// --- Modal/Alert Function (Replaces standard alert()) ---
function alertModal(title, message) {
    // Check if modal exists, if not, create it
    let modal = document.getElementById('custom-alert-modal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'custom-alert-modal';
        modal.className = 'fixed inset-0 bg-gray-900 bg-opacity-70 flex items-center justify-center z-50 transition-opacity duration-300';
        modal.innerHTML = `
            <div class="bg-white rounded-xl shadow-2xl p-6 max-w-sm w-full transform transition-all duration-300 scale-95 opacity-0">
                <h4 id="alert-title" class="text-xl font-bold text-violet-700 mb-3"></h4>
                <p id="alert-message" class="text-gray-700 mb-6"></p>
                <button id="alert-close-btn" class="w-full p-3 rounded-lg bg-violet-600 hover:bg-violet-700 text-white font-semibold transition">
                    ${t('ui.modal.close')}
                </button>
            </div>
        `;
        document.body.appendChild(modal);
        document.getElementById('alert-close-btn').onclick = () => {
            // Start fade out animation
            modal.querySelector('div').classList.add('scale-95', 'opacity-0');
            modal.classList.add('opacity-0');
            setTimeout(() => modal.classList.add('hidden'), 300);
        };
    }

    document.getElementById('alert-title').textContent = title;
    document.getElementById('alert-message').innerHTML = message;
    // Ensure close button text matches current language on subsequent openings
    const closeBtn = document.getElementById('alert-close-btn');
    if (closeBtn) closeBtn.textContent = t('ui.modal.close');
    
    modal.classList.remove('hidden', 'opacity-0');
    modal.querySelector('div').classList.remove('scale-95', 'opacity-0');
}

// --- Reset Function ---
function resetApp() {
    uploadedFile = null;
    compressedSize = 0;
    document.getElementById('file-upload').value = '';

    document.getElementById('result-section').classList.add('hidden');
    document.getElementById('control-section').classList.add('hidden');
    document.getElementById('upload-section').classList.remove('hidden');
}

// --- Theme Toggle Function ---
function toggleTheme() {
    const body = document.body;
    const isDark = body.classList.toggle('dark-mode');
    const sunIcon = document.getElementById('sun-icon');
    const moonIcon = document.getElementById('moon-icon');
    
    sunIcon.classList.toggle('hidden', isDark);
    moonIcon.classList.toggle('hidden', !isDark);
    
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
}

// Apply saved theme and language on load
window.addEventListener('DOMContentLoaded', () => {
    // Theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        document.getElementById('sun-icon').classList.add('hidden');
        document.getElementById('moon-icon').classList.remove('hidden');
    }

    // Language
    try {
        const initialLang = getSystemLang();
        populateLangList();
        applyTranslations(initialLang);
        localStorage.setItem(LANG_KEY, initialLang);
    } catch (_) { /* no-op */ }

    // Language flyout interactions with delayed open/close
    const selector = document.querySelector('.lang-selector');
    const btn = document.getElementById('lang-button');
    const panel = selector ? selector.querySelector('.lang-flyout') : null;
    let openTimer, closeTimer;
    const openFlyout = () => {
        clearTimeout(closeTimer);
        openTimer = setTimeout(() => {
            selector && selector.classList.add('open');
            btn && btn.setAttribute('aria-expanded', 'true');
        }, 120);
    };
    const closeFlyout = () => {
        clearTimeout(openTimer);
        closeTimer = setTimeout(() => {
            selector && selector.classList.remove('open');
            btn && btn.setAttribute('aria-expanded', 'false');
        }, 220);
    };
    if (btn && panel && selector) {
        ['mouseenter','focus'].forEach(ev => btn.addEventListener(ev, openFlyout));
        ['mouseleave','blur'].forEach(ev => btn.addEventListener(ev, closeFlyout));
        ['mouseenter','focus'].forEach(ev => panel.addEventListener(ev, openFlyout));
        ['mouseleave','blur'].forEach(ev => panel.addEventListener(ev, closeFlyout));
        btn.addEventListener('click', () => {
            if (selector.classList.contains('open')) { closeFlyout(); }
            else { openFlyout(); }
        });
    }
});
