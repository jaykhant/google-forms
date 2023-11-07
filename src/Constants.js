const QUESTION_TYPES = {
    SHORT_ANSWER: 'short_answer',
    PARAGRAPH: 'paragraph',
    MULTIPLE_CHOICE: 'multiple_choice',
    CHECKBOX: 'checkbox',
    DROP_DOWN: 'drop_down',
    FILE_UPLOAD: 'file_upload',
    DATE: 'date',
    TIME: 'time',
}

const QUESTION_TYPE_DISPLAY_NAMES = {
    short_answer: 'Short Answer',
    paragraph: 'Paragraph',
    multiple_choice: 'Multiple choice',
    checkbox: 'Checkboxes',
    drop_down: 'Drop down',
    file_upload: 'File Upload',
    date: 'Date',
    time: 'Time'
}

const FILE_TYPES = {
    AUDIO: 'audio',
    VIDEO: 'video',
    IMAGE: 'image',
    DOCUMENT: 'document'
}

const FILE_TYPES_DISPLAY_NAMES = {
    audio: 'audio/*,',
    video: 'video/*,',
    image: 'image/*,',
    document: '.doc,'
}

module.exports = {
    QUESTION_TYPES,
    QUESTION_TYPE_DISPLAY_NAMES,
    FILE_TYPES,
    FILE_TYPES_DISPLAY_NAMES
}