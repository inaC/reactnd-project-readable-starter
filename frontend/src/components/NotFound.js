import React from 'react';
import SocialSentimentVeryDissatisfied from 'material-ui/svg-icons/social/sentiment-dissatisfied';

const NotFound = () => {
  const iconStyle = {
    color: 'gray',
    width: 120,
    height: 120,
    padding: 30,
  };

  return (
    <div className="notFound">
      <SocialSentimentVeryDissatisfied style={iconStyle} />
      <div> Post not found </div>
    </div>
  );
};

export default NotFound;
