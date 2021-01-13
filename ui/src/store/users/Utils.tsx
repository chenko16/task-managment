export default class Utils {

    static getUserColor (login) {
        switch (login.length % 10) {
            case 0:
                return '99FFCC';
            case 1:
                return 'FFFF66';
            case 2:
                return 'FF9999';
            case 3:
                return 'CCFFFF';
            case 4:
                return 'CCFF99';
            case 5:
                return 'FFCC66';
            case 6:
                return '99CCFF';
            case 7:
                return 'FFCCFF';
            default:
                return 'CCCCFF';
        }
    };
}
