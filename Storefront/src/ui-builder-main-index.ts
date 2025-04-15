import { Http, CommonUtilities, contentServiceResponseParser } from './utilities';
import { App } from './main-apps/ui-builder-index';
import { Widget } from './lib/widget';
import { DraggableArea } from './components';
import { useParams, Navigate, Link, useNavigate, useSearchParams, BrowserRouter as Router, Route, Routes as Switch } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Page } from './components';
import { ContentService, AuthService, EcommerceService, AnalyticsService, BigcommerceService } from "./services";
import Select from 'react-select';

const IsCMSApp = process.env.REACT_APP_BUILD_TARGET === 'app' || !process.env.REACT_APP_BUILD_TARGET;

export { App, Http, Widget, DraggableArea, ContentService, AuthService, IsCMSApp, useParams, Navigate, useNavigate, Link, toast,CommonUtilities, useSearchParams, Route, Router, Switch, EcommerceService, Page, AnalyticsService, BigcommerceService, Select, contentServiceResponseParser }
