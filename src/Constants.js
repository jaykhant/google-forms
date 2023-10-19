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
    multiple_choice: 'Multiple choise',
    checkbox: 'Checkboxes',
    drop_down: 'Drop down',
    file_upload: 'File Upload',
    date: 'Date',
    time: 'Time'
}

const FILE_ACCEPT_TYPE = {
    audio: 'audio/*,',
    videp: 'video/*,',
    document: '.doc,',
    image: 'image/*,'
}

module.exports = {
    QUESTION_TYPES,
    QUESTION_TYPE_DISPLAY_NAMES,
    FILE_ACCEPT_TYPE
}