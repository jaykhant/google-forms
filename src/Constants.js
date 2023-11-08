export const QUESTION_TYPES = {
    SHORT_ANSWER: 'short_answer',
    PARAGRAPH: 'paragraph',
    MULTIPLE_CHOICE: 'multiple_choice',
    CHECKBOX: 'checkbox',
    DROP_DOWN: 'drop_down',
    FILE_UPLOAD: 'file_upload',
    DATE: 'date',
    TIME: 'time',
}

export const QUESTION_TYPE_DISPLAY_NAMES = {
    short_answer: 'Short Answer',
    paragraph: 'Paragraph',
    multiple_choice: 'Multiple choice',
    checkbox: 'Checkboxes',
    drop_down: 'Drop down',
    file_upload: 'File Upload',
    date: 'Date',
    time: 'Time'
}

export const FILE_TYPES = {
    AUDIO: 'audio',
    VIDEO: 'video',
    IMAGE: 'image',
    DOCUMENT: 'document'
}

export const FILE_ACCEPT_TYPES = {
    [FILE_TYPES.AUDIO]: 'audio/*,',
    [FILE_TYPES.VIDEO]: 'video/*,',
    [FILE_TYPES.IMAGE]: 'image/*,',
    [FILE_TYPES.DOCUMENT]: '.doc,'
}
