// Global state
let uploadedFile = null;
let compressedSize = 0;
// effects flag (background animations)
let effectsEnabled = true;

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
        'ui.effects.label': 'Effects',
        'ui.effects.on': 'On',
        'ui.effects.paused': 'Paused',
        'ui.effects.off': 'Off',
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
        'ui.effects.label': 'Efectos',
        'ui.effects.on': 'Activado',
        'ui.effects.off': 'Desactivado',
        'ui.effects.paused': 'Pausado',
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
        'ui.effects.label': 'Effets',
        'ui.effects.on': 'Activé',
        'ui.effects.off': 'Désactivé',
        'ui.effects.paused': 'En pause',
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
        'ui.effects.label': 'Effekte',
        'ui.effects.on': 'Ein',
        'ui.effects.off': 'Aus',
        'ui.effects.paused': 'Pausiert',
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
        'ui.effects.label': '效果',
        'ui.effects.on': '开启',
        'ui.effects.off': '关闭',
        'ui.effects.paused': '已暂停',
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
        'ui.effects.label': 'التأثيرات',
        'ui.effects.on': 'تشغيل',
        'ui.effects.off': 'إيقاف',
        'ui.effects.paused': 'موقوف',
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
        'ui.effects.label': 'Эффекты',
        'ui.effects.on': 'Вкл',
        'ui.effects.off': 'Выкл',
        'ui.effects.paused': 'Приостановлено',
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
        'ui.effects.label': 'Efeitos',
        'ui.effects.on': 'Ligado',
        'ui.effects.off': 'Desligado',
        'ui.effects.paused': 'Pausado',
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
        'ui.effects.label': 'प्रभाव',
        'ui.effects.on': 'चालू',
        'ui.effects.off': 'बंद',
        'ui.effects.paused': 'रुका हुआ',
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
        'ui.effects.label': 'エフェクト',
        'ui.effects.on': 'オン',
        'ui.effects.off': 'オフ',
        'ui.effects.paused': '一時停止',
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
    // start/stop universe background to match theme
    try { startUniverseIfNeeded(); } catch (e) { /* no-op */ }
}

// --- Universe background (dark theme) ---
const universe = {
    canvas: null,
    ctx: null,
    particles: [],
    animationId: null,
    active: false,
};

// Visual presets for the universe background. Values adjust density, spark frequency, color ranges, and motion.
const PRESET_KEY = 'effects:preset';
const VISUAL_PRESETS = {
    subtle: {
        densityDiv: 12,
        maxCount: 220,
        countMin: 40,
        smallScreenFactor: 0.35,
        sparkFreq: 0.06,
        zMin: 0.3,
        zRange: 1.6,
        rSparkMin: 2, rSparkMax: 4,
        rStarMin: 0.3, rStarMax: 1.9,
        vxSpark: 0.05, vxStar: 0.25,
        vySpark: 0.02, vyStar: 0.2,
        glowMin: 0.2, glowMax: 1.1,
        twinkleBase: 0.6, twinkleVar: 1.6,
        hueStarMin: 200, hueStarRange: 70,
        hueSparkMin: 30, hueSparkRange: 20
    },
    cinematic: {
        densityDiv: 7,
        maxCount: 420,
        countMin: 80,
        smallScreenFactor: 0.5,
        sparkFreq: 0.14,
        zMin: 0.2,
        zRange: 2.0,
        rSparkMin: 1.8, rSparkMax: 4.4,
        rStarMin: 0.4, rStarMax: 3.4,
        vxSpark: 0.28, vxStar: 0.6,
        vySpark: 0.10, vyStar: 0.42,
        glowMin: 0.6, glowMax: 1.2,
        twinkleBase: 0.8, twinkleVar: 2.0,
        hueStarMin: 160, hueStarRange: 140,
        hueSparkMin: 30, hueSparkRange: 40
    },
    dramatic: {
        densityDiv: 5,
        maxCount: 600,
        countMin: 120,
        smallScreenFactor: 0.55,
        sparkFreq: 0.22,
        zMin: 0.1,
        zRange: 2.6,
        rSparkMin: 2.2, rSparkMax: 5.6,
        rStarMin: 0.6, rStarMax: 4.0,
        vxSpark: 0.42, vxStar: 0.9,
        vySpark: 0.18, vyStar: 0.6,
        glowMin: 0.7, glowMax: 1.4,
        twinkleBase: 0.9, twinkleVar: 2.6,
        hueStarMin: 140, hueStarRange: 160,
        hueSparkMin: 18, hueSparkRange: 60
    }
};

let currentVisualPreset = localStorage.getItem(PRESET_KEY) || 'cinematic';

// Nebula palettes for canvas backgrounds per preset
const NEBULA_PALETTES = {
    subtle: [
        ['rgba(140,160,200,0.12)', 'rgba(110,140,180,0.04)'],
        ['rgba(220,200,170,0.04)', 'rgba(220,200,170,0.01)'],
        ['rgba(180,190,210,0.06)', 'rgba(160,170,200,0.02)']
    ],
    cinematic: [
        ['rgba(180,120,255,0.16)', 'rgba(110,180,255,0.06)'],
        ['rgba(255,170,110,0.08)', 'rgba(255,110,80,0.02)'],
        ['rgba(90,160,200,0.10)', 'rgba(70,100,220,0.05)']
    ],
    dramatic: [
        ['rgba(220,100,255,0.22)', 'rgba(140,200,255,0.10)'],
        ['rgba(255,140,60,0.14)', 'rgba(255,90,40,0.06)'],
        ['rgba(120,190,230,0.14)', 'rgba(90,120,240,0.08)']
    ]
};

// Dune visual adjustments for light theme per preset
const DUNE_PRESETS = {
    subtle: {
        fills: ['rgba(255, 223, 134, 0.8)', 'rgba(255, 244, 199, 0.75)', 'rgba(255, 236, 166, 0.7)'],
        speeds: [24, 28, 32]
    },
    cinematic: {
        fills: ['rgba(255, 223, 134, 0.95)', 'rgba(255, 244, 199, 0.9)', 'rgba(255, 236, 166, 0.85)'],
        speeds: [20, 26, 30]
    },
    dramatic: {
        fills: ['rgba(255, 200, 100, 0.98)', 'rgba(255, 230, 160, 0.95)', 'rgba(255, 210, 120, 0.9)'],
        speeds: [16, 20, 24]
    }
};

const PRESET_DESCRIPTIONS = {
    subtle: 'Subtle — low density, gentle motion and soft halos. Good for low-power devices and when you want an unobtrusive background.',
    cinematic: 'Cinematic — balanced density with richer nebula colors and warm sparks for depth. Good default for a polished look.',
    dramatic: 'Dramatic — high density, bold warm sparks and larger halos for a cinematic, high-impact background. Uses more CPU.'
};

function applyVisualPresetToUI() {
    // Update segmented button UI to reflect currentVisualPreset
    const buttons = document.querySelectorAll('.preset-btn');
    buttons.forEach(btn => {
        const name = btn.getAttribute('data-preset');
        const active = name === currentVisualPreset;
        btn.setAttribute('aria-pressed', active ? 'true' : 'false');
        if (active) btn.classList.add('active'); else btn.classList.remove('active');
    });
}

function showPresetHelp(name) {
    try {
        const el = document.getElementById('preset-help');
        if (!el) return;
        el.textContent = PRESET_DESCRIPTIONS[name] || '';
    } catch (e) { /* no-op */ }
}

function setVisualPreset(name) {
    if (!VISUAL_PRESETS[name]) name = 'cinematic';
    currentVisualPreset = name;
    localStorage.setItem(PRESET_KEY, name);
    applyVisualPresetToUI();
    showPresetHelp(name);
    // update body class for stylesheet hooks and state
    try {
        document.body.classList.remove('preset-subtle','preset-cinematic','preset-dramatic');
        document.body.classList.add('preset-' + name);
    } catch (e) {}
    // Update dunes for light theme to reflect preset
    try { updateDunesForPreset(name); } catch (e) {}
    // if universe is active, re-seed particles for immediate feedback
    try { if (universe.active) createParticles(); } catch (e) { /* no-op */ }
}

function updateDunesForPreset(name) {
    const cfg = DUNE_PRESETS[name] || DUNE_PRESETS.cinematic;
    const dunes = document.querySelectorAll('#dunes svg .dune, #dunes svg path');
    // prefer targeting the path elements inside svg
    const paths = document.querySelectorAll('#dunes svg path');
    if (paths && paths.length) {
        paths.forEach((p, i) => {
            const fill = cfg.fills[i] || cfg.fills[ i % cfg.fills.length ];
            p.setAttribute('fill', fill);
            // adjust opacity slightly from fill alpha
            p.style.opacity = 0.9 - (i * 0.05);
        });
    }
    // adjust animation speeds if present by changing inline style on svg elements
    const svgs = document.querySelectorAll('#dunes svg');
    svgs.forEach((s, i) => {
        const dur = (cfg.speeds[i] || cfg.speeds[0]) + 's';
        s.style.animationDuration = dur;
    });
}

function initUniverse() {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    universe.canvas = document.getElementById('universe-canvas');
    if (!universe.canvas) return;
    universe.ctx = universe.canvas.getContext('2d');

    // Sizing
    function resize() {
        const dpr = Math.max(1, window.devicePixelRatio || 1);
        universe.canvas.width = Math.floor(universe.canvas.clientWidth * dpr);
        universe.canvas.height = Math.floor(universe.canvas.clientHeight * dpr);
        if (universe.ctx) universe.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resize();
    window.addEventListener('resize', () => {
        resize();
        // re-seed particles for new size
        if (universe.active) createParticles();
    });

    // Create a modest number of particles; fewer on small screens or reduced motion
    // Cinematic particle seeder: denser, richer colors, and more prominent sparks
    function createParticles() {
        const w = universe.canvas.clientWidth;
        const preset = VISUAL_PRESETS[currentVisualPreset] || VISUAL_PRESETS.cinematic;
        // base count derived from width and preset density
        const countBase = Math.max(preset.countMin || 40, Math.floor(w / preset.densityDiv));
        const count = Math.min(preset.maxCount, countBase);
        universe.particles = [];
        const smallScreen = window.innerWidth < 640;
        const finalCount = smallScreen ? Math.floor(count * preset.smallScreenFactor) : count;
        for (let i = 0; i < finalCount; i++) {
            const isSpark = Math.random() < preset.sparkFreq;
            const z = preset.zMin + Math.random() * preset.zRange;

            const r = Math.random() * (isSpark ? (preset.rSparkMax - preset.rSparkMin) : (preset.rStarMax - preset.rStarMin)) + (isSpark ? preset.rSparkMin : preset.rStarMin);

            const vx = (Math.random() - 0.5) * (isSpark ? preset.vxSpark : preset.vxStar);
            const vy = (Math.random() - 0.5) * (isSpark ? preset.vySpark : preset.vyStar);

            let hue;
            if (isSpark) {
                hue = preset.hueSparkMin + Math.random() * (preset.hueSparkRange || 30);
            } else {
                hue = preset.hueStarMin + Math.random() * (preset.hueStarRange || 80);
            }

            universe.particles.push({
                x: Math.random() * universe.canvas.clientWidth,
                y: Math.random() * universe.canvas.clientHeight,
                z: z,
                r: r,
                vx: vx,
                vy: vy,
                glow: (preset.glowMin || 0.4) + Math.random() * ((preset.glowMax || 1.0) - (preset.glowMin || 0.4)),
                phase: Math.random() * Math.PI * 2,
                twinkleSpeed: (preset.twinkleBase || 0.6) + Math.random() * (preset.twinkleVar || 1.6),
                hue: Math.floor(hue),
                type: isSpark ? 'spark' : 'star'
            });
        }
    }

    function draw() {
        if (!universe.ctx) return;
        const ctx = universe.ctx;
        const w = universe.canvas.clientWidth;
        const h = universe.canvas.clientHeight;
        const t = performance.now() / 1000;

        // cinematic gradient background for dramatic depth
        const g = ctx.createLinearGradient(0, 0, 0, h);
        g.addColorStop(0, '#02020a');
        g.addColorStop(0.35, '#0b1026');
        g.addColorStop(0.65, '#07183a');
        g.addColorStop(1, '#001420');
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, w, h);

        // layered nebula blobs — palette depends on the selected preset
        const palette = NEBULA_PALETTES[currentVisualPreset] || NEBULA_PALETTES.cinematic;
        const nebulaLayers = [
            { ox: 0.18, oy: 0.12, scale: 0.42, stops: [ [palette[0][0], 0], [palette[0][1], 0.45], ['rgba(0,0,0,0)', 1] ] },
            { ox: 0.62, oy: 0.22, scale: 0.38, stops: [ [palette[1][0], 0], [palette[1][1], 0.4], ['rgba(0,0,0,0)', 1] ] },
            { ox: 0.42, oy: 0.46, scale: 0.5, stops: [ [palette[2][0], 0], [palette[2][1], 0.5], ['rgba(0,0,0,0)', 1] ] }
        ];
        nebulaLayers.forEach((layer, i) => {
            const nx = layer.ox * w;
            const ny = layer.oy * h;
            const rad = Math.min(w, h) * layer.scale;
            const ng = ctx.createRadialGradient(nx, ny, rad * 0.03, nx, ny, rad);
            layer.stops.forEach(s => ng.addColorStop(s[1], s[0]));
            ctx.fillStyle = ng;
            ctx.beginPath();
            ctx.arc(nx, ny, rad, 0, Math.PI * 2);
            ctx.fill();
            // extra soft light for cinematic glow
            ctx.globalCompositeOperation = 'lighter';
            const glow = ctx.createRadialGradient(nx, ny, 0, nx, ny, rad * 1.6);
            const glowColor = layer.stops[0] ? layer.stops[0][0] : 'rgba(180,120,255,0.04)';
            // use a very transparent version of the first stop for glow
            const glowRGBA = glowColor.replace('rgb', 'rgba').replace(')', '').replace(')', '');
            // fallback glow
            glow.addColorStop(0, 'rgba(180,120,255,0.04)');
            glow.addColorStop(1, 'rgba(0,0,0,0)');
            ctx.fillStyle = glow;
            ctx.beginPath();
            ctx.arc(nx, ny, rad * 1.6, 0, Math.PI * 2);
            ctx.fill();
            ctx.globalCompositeOperation = 'source-over';
        });

        // stars
        universe.particles.forEach(p => {
            // movement with slight depth modulation
            p.x += p.vx * (1 + p.z * 0.08);
            p.y += p.vy * (1 + p.z * 0.08);
            if (p.x < -12) p.x = w + 12;
            if (p.x > w + 12) p.x = -12;
            if (p.y < -12) p.y = h + 12;
            if (p.y > h + 12) p.y = -12;

            // twinkle
            const tw = 0.6 + 0.45 * Math.sin(t * p.twinkleSpeed + p.phase);

            if (p.type === 'spark') {
                // cinematic sparks: warm, slightly larger, with stronger halo
                const alpha = Math.min(1, 0.85 * p.glow * tw + 0.12);
                // core
                ctx.beginPath();
                ctx.fillStyle = `hsla(${p.hue}, 100%, 60%, ${alpha})`;
                ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                ctx.fill();
                // bright inner ring
                const inner = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 4);
                inner.addColorStop(0, `hsla(${p.hue},100%,70%,${0.28 * p.glow * tw})`);
                inner.addColorStop(1, 'rgba(0,0,0,0)');
                ctx.fillStyle = inner;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.r * 4, 0, Math.PI * 2);
                ctx.fill();
                // soft outer halo
                ctx.globalCompositeOperation = 'lighter';
                const halo = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 12);
                halo.addColorStop(0, `hsla(${p.hue},90%,65%,${0.06 * p.glow * tw})`);
                halo.addColorStop(1, 'rgba(0,0,0,0)');
                ctx.fillStyle = halo;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.r * 12, 0, Math.PI * 2);
                ctx.fill();
                ctx.globalCompositeOperation = 'source-over';
            } else {
                const alpha = 0.5 * p.glow * tw;
                // star core (slightly colored by hue for cinematic depth)
                ctx.beginPath();
                ctx.fillStyle = `hsla(${p.hue}, 90%, 88%, ${alpha})`;
                ctx.arc(p.x, p.y, (p.r * p.z), 0, Math.PI * 2);
                ctx.fill();
                // colored halo
                ctx.globalCompositeOperation = 'lighter';
                const halo = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 9);
                halo.addColorStop(0, `hsla(${p.hue},80%,70%,${0.06 * p.glow * tw})`);
                halo.addColorStop(1, 'rgba(0,0,0,0)');
                ctx.fillStyle = halo;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.r * 9, 0, Math.PI * 2);
                ctx.fill();
                ctx.globalCompositeOperation = 'source-over';
            }
        });
    }

    function animate() {
        if (!universe.active) return;
        draw();
        universe.animationId = requestAnimationFrame(animate);
    }

    // start with created particles
    createParticles();

    // expose helper functions
    universe.start = function() {
        if (universe.active) return;
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return; // honor reduced motion
        universe.active = true;
        createParticles();
        universe.animationId = requestAnimationFrame(animate);
    };
    universe.stop = function() {
        universe.active = false;
        if (universe.animationId) cancelAnimationFrame(universe.animationId);
        universe.animationId = null;
        // clear canvas for light theme
        if (universe.ctx) universe.ctx.clearRect(0, 0, universe.canvas.width, universe.canvas.height);
    };
}

function startUniverseIfNeeded() {
    const canvas = document.getElementById('universe-canvas');
    if (!canvas) return;
    if (!universe.canvas) initUniverse();
    const isDark = document.body.classList.contains('dark-mode');
    if (isDark && effectsEnabled) universe.start(); else universe.stop();
}

function applyEffectsSetting() {
    const saved = localStorage.getItem('effects:enabled');
    effectsEnabled = saved === null ? true : saved === 'true';
    document.body.classList.toggle('no-effects', !effectsEnabled);
    // ensure reduced motion preference also takes precedence
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        effectsEnabled = false;
        document.body.classList.add('no-motion');
    }
    const btn = document.getElementById('effects-toggle');
    if (btn) {
        btn.setAttribute('aria-pressed', effectsEnabled ? 'true' : 'false');
        // localized title using translations
        const label = t('ui.effects.label') || 'Effects';
        const onText = t('ui.effects.on') || 'On';
        const offText = t('ui.effects.off') || 'Off';
        btn.title = `${label}: ${effectsEnabled ? onText : offText}`;
        // also update aria-label for screen readers
        btn.setAttribute('aria-label', `${label}: ${effectsEnabled ? onText : offText}`);
    }
    // update visible state label
    const state = document.getElementById('effects-state');
    if (state) state.textContent = effectsEnabled ? t('ui.effects.on') || 'On' : t('ui.effects.off') || 'Off';
    // update paused badge title too
    const pausedBadge = document.getElementById('paused-badge');
    if (pausedBadge) pausedBadge.title = t('ui.effects.paused') || 'Paused';
    startUniverseIfNeeded();
}

function toggleEffects() {
    effectsEnabled = !effectsEnabled;
    localStorage.setItem('effects:enabled', effectsEnabled ? 'true' : 'false');
    applyEffectsSetting();
}

// keyboard support for the effects toggle (Enter/Space) - attach during DOMContentLoaded
function attachEffectsKeyboardSupport() {
    const btn = document.getElementById('effects-toggle');
    if (!btn) return;
    btn.addEventListener('keydown', (ev) => {
        if (ev.key === 'Enter' || ev.key === ' ') {
            ev.preventDefault();
            toggleEffects();
        }
    });
}

// Pause/resume when the page visibility changes to save CPU/battery
document.addEventListener('visibilitychange', () => {
    const pausedBadge = document.getElementById('paused-badge');
    if (document.hidden) {
        try { universe.stop(); } catch (e) {}
        document.body.classList.add('effects-paused-hidden');
        if (pausedBadge) {
            pausedBadge.setAttribute('aria-hidden', 'false');
            pausedBadge.title = t('ui.effects.paused') || 'Paused';
        }
    } else {
        document.body.classList.remove('effects-paused-hidden');
        if (pausedBadge) {
            pausedBadge.setAttribute('aria-hidden', 'true');
            pausedBadge.title = t('ui.effects.paused') || 'Paused';
        }
        try { startUniverseIfNeeded(); } catch (e) {}
    }
});

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

    // Effects (background animations)
    try { applyEffectsSetting(); } catch (e) { /* no-op */ }

    // Visual preset segmented control wiring
    try {
        // ensure currentVisualPreset is set from storage at load
        if (!currentVisualPreset) currentVisualPreset = localStorage.getItem(PRESET_KEY) || 'cinematic';
        applyVisualPresetToUI();
        const buttons = document.querySelectorAll('.preset-btn');
        buttons.forEach(btn => {
            btn.addEventListener('click', (ev) => {
                const name = btn.getAttribute('data-preset');
                setVisualPreset(name);
                applyVisualPresetToUI();
            });
            // keyboard support for accessibility (Enter / Space)
            btn.addEventListener('keydown', (ev) => {
                if (ev.key === 'Enter' || ev.key === ' ') {
                    ev.preventDefault();
                    const name = btn.getAttribute('data-preset');
                    setVisualPreset(name);
                    applyVisualPresetToUI();
                }
            });
            // left/right arrow navigation between presets
            btn.addEventListener('keydown', (ev) => {
                if (ev.key === 'ArrowLeft' || ev.key === 'ArrowRight') {
                    ev.preventDefault();
                    const all = Array.from(document.querySelectorAll('.preset-btn'));
                    const idx = all.indexOf(ev.currentTarget);
                    if (idx === -1) return;
                    const dir = ev.key === 'ArrowLeft' ? -1 : 1;
                    const next = (idx + dir + all.length) % all.length;
                    const nextBtn = all[next];
                    nextBtn.focus();
                    const name = nextBtn.getAttribute('data-preset');
                    setVisualPreset(name);
                    applyVisualPresetToUI();
                }
            });
            // hover/focus show description
            btn.addEventListener('mouseenter', (ev) => {
                const name = btn.getAttribute('data-preset');
                showPresetHelp(name);
            });
            btn.addEventListener('mouseleave', (ev) => {
                showPresetHelp(currentVisualPreset);
            });
            btn.addEventListener('focus', (ev) => {
                const name = btn.getAttribute('data-preset');
                showPresetHelp(name);
            });
            btn.addEventListener('blur', (ev) => {
                showPresetHelp(currentVisualPreset);
            });
        });
    } catch (e) { /* no-op */ }

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
    // Start or stop the universe background according to the initial theme
    try { startUniverseIfNeeded(); } catch (e) { /* no-op */ }
    // attach keyboard support for effects toggle
    try { attachEffectsKeyboardSupport(); } catch (e) { /* no-op */ }
    // show help for the initial preset
    try { showPresetHelp(currentVisualPreset); } catch (e) {}
    // apply dunes and body class for initial preset so light theme reflects it
    try { document.body.classList.add('preset-' + currentVisualPreset); updateDunesForPreset(currentVisualPreset); } catch (e) {}
});
