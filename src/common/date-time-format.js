const moment = require('moment');
class Datetime{

    static getPostDate(dateString) {
        const now = moment();
        const postDate = moment(dateString);
      
        const diffHours = now.diff(postDate, 'hours');
        if (diffHours<1){
            const diffMinutes = now.diff(postDate, 'minutes');
            return `${diffMinutes}m ago`;  
        }
        if (diffHours < 24) {
          // Show hours if posted less than 24 hours ago
          return `${diffHours}h ago`;
        } else if (diffHours < 24 * 7) {
          // Show days if posted less than a week ago
          const diffDays = now.diff(postDate, 'days');
          return `${diffDays}d ago`;
        } else {
          // Show date if posted more than a week ago
          return postDate.format('MMM D, YYYY');
        }
      }

}

module.exports =  Datetime;

