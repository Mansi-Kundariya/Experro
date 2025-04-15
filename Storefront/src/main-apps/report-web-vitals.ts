import { AnalyticsService } from '../services/analytics-service';
import {onCLS, onFID, onFCP, onINP, onLCP, onTTFB} from 'web-vitals';


function sendToGoogleAnalytics({name, delta, value, rating, id, navigationType}) {
  console.log(`${name} - ${rating} - ${value}`);
  AnalyticsService.trackEvent({
    eventName: `web_vitals_${name.toLowerCase()}`,
    count: 0,
    sum: 0,
    dur: 0,
    eventData: {
      name: name,
      value: delta,
      path: window.location.pathname.replace('/_ssr_', ''),
      metric_id: id,
      metric_value: value,
      metric_delta: delta,
      metric_rating: rating,
      metric_navigation_type: navigationType
    },
  });
}

const reportWebVitals = () => {
    onCLS(sendToGoogleAnalytics, {reportAllChanges: true});
    onINP(sendToGoogleAnalytics, {reportAllChanges: true});
    onFID(sendToGoogleAnalytics, {reportAllChanges: true});
    onFCP(sendToGoogleAnalytics, {reportAllChanges: true});
    onLCP(sendToGoogleAnalytics, {reportAllChanges: true});
    onTTFB(sendToGoogleAnalytics, {reportAllChanges: true});
};

export default reportWebVitals;
