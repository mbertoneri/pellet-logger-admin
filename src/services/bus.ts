import EventEmitter from 'events';
import { DownloadEvent, Flash } from 'typings/shared';

const Bus = new EventEmitter();

const flash = (flashMessage: Flash): boolean => Bus.emit('flash', flashMessage);
const downloadFile = (downloadMessage: DownloadEvent<File>): boolean => Bus.emit('download', downloadMessage);

export { downloadFile, flash };

export default Bus;
