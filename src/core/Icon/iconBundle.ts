import accessKey from "../../assets/icons/access_key.svg";
import agents from "../../assets/icons/agents.svg";
import alert from "../../assets/icons/alert.svg";
import analytics from "../../assets/icons/analytics.svg";
import arrowDown from "../../assets/icons/arrowDown.svg";
import arrowLeft from "../../assets/icons/arrowLeft.svg";
import arrowRight from "../../assets/icons/arrowRight.svg";
import arrowUp from "../../assets/icons/arrowUp.svg";
import backward from "../../assets/icons/backward.svg";
import bell from "../../assets/icons/bell.svg";
import calendar from "../../assets/icons/calendar.svg";
import chaoshub from "../../assets/icons/chaoshub.svg";
import check from "../../assets/icons/check.svg";
import chevronDown from "../../assets/icons/chevronDown.svg";
import chevronLeft from "../../assets/icons/chevronLeft.svg";
import chevronRight from "../../assets/icons/chevronRight.svg";
import chevronUp from "../../assets/icons/chevronUp.svg";
import chooseAgent from "../../assets/icons/chooseAgent.svg";
import clock from "../../assets/icons/clock.svg";
import close from "../../assets/icons/close.svg";
import closeWrapped from "../../assets/icons/closeWrapped.svg";
import cloud from "../../assets/icons/cloud.svg";
import clusters from "../../assets/icons/clusters.svg";
import code from "../../assets/icons/code.svg";
import codeFilled from "../../assets/icons/codeFilled.svg";
import collapseDown from "../../assets/icons/collapseDown.svg";
import collapseLeft from "../../assets/icons/collapseLeft.svg";
import collapseRight from "../../assets/icons/collapseRight.svg";
import collapseUp from "../../assets/icons/collapseUp.svg";
import community from "../../assets/icons/community.svg";
import computer from "../../assets/icons/computer.svg";
import configure from "../../assets/icons/configure.svg";
import copy from "../../assets/icons/copy.svg";
import dart from "../../assets/icons/dart.svg";
import dataSource from "../../assets/icons/dataSource.svg";
import disableSchedule from "../../assets/icons/disableSchedule.svg";
import disconnectTarget from "../../assets/icons/disconnectTarget.svg";
import document from "../../assets/icons/document.svg";
import documentWrapped from "../../assets/icons/documentWrapped.svg";
import download from "../../assets/icons/download.svg";
import drive from "../../assets/icons/drive.svg";
import dropbox from "../../assets/icons/dropbox.svg";
import editSequence from "../../assets/icons/editSequence.svg";
import editWrapped from "../../assets/icons/editWrapped.svg";
import enableSchedule from "../../assets/icons/enableSchedule.svg";
import expand from "../../assets/icons/expand.svg";
import expandDown from "../../assets/icons/expandDown.svg";
import expandLeft from "../../assets/icons/expandLeft.svg";
import expandRight from "../../assets/icons/expandRight.svg";
import expandUp from "../../assets/icons/expandUp.svg";
import experiment from "../../assets/icons/experiment.svg";
import experimentError from "../../assets/icons/experimentError.svg";
import experimentFailed from "../../assets/icons/experimentFailed.svg";
import experimentFilled from "../../assets/icons/experimentFilled.svg";
import experimentNotAvailable from "../../assets/icons/experimentNotAvailable.svg";
import experimentOmitted from "../../assets/icons/experimentOmitted.svg";
import experimentPassed from "../../assets/icons/experimentPassed.svg";
import experimentPending from "../../assets/icons/experimentPending.svg";
import experimentRunning from "../../assets/icons/experimentRunning.svg";
import experimentSkipped from "../../assets/icons/experimentSkipped.svg";
import experimentBox from "../../assets/icons/experiment_box.svg";
import externalLink from "../../assets/icons/externalLink.svg";
import eye from "../../assets/icons/eye.svg";
import eyeSlash from "../../assets/icons/eyeSlash.svg";
import feedback from "../../assets/icons/feedback.svg";
import filter from "../../assets/icons/filter.svg";
import forward from "../../assets/icons/forward.svg";
import fullscreen from "../../assets/icons/fullscreen.svg";
import hamburger from "../../assets/icons/hamburger.svg";
import home from "../../assets/icons/home.svg";
import info from "../../assets/icons/info.svg";
import like from "../../assets/icons/like.svg";
import logout from "../../assets/icons/logout.svg";
import logs from "../../assets/icons/logs.svg";
import maximize from "../../assets/icons/maximize.svg";
import medal from "../../assets/icons/medal.svg";
import menuHorizontal from "../../assets/icons/menuHorizontal.svg";
import menuVertical from "../../assets/icons/menuVertical.svg";
import minimize from "../../assets/icons/minimize.svg";
import paused from "../../assets/icons/paused.svg";
import pencil from "../../assets/icons/pencil.svg";
import plus from "../../assets/icons/plus.svg";
import project from "../../assets/icons/project.svg";
import recurringSchedule from "../../assets/icons/recurringSchedule.svg";
import refresh from "../../assets/icons/refresh.svg";
import reload from "../../assets/icons/reload.svg";
import rocket from "../../assets/icons/rocket.svg";
import schedule from "../../assets/icons/schedule.svg";
import scheduleWorkflow from "../../assets/icons/scheduleWorkflow.svg";
import search from "../../assets/icons/search.svg";
import settings from "../../assets/icons/settings.svg";
import share from "../../assets/icons/share.svg";
import showAnalytics from "../../assets/icons/showAnalytics.svg";
import sort from "../../assets/icons/sort.svg";
import sync from "../../assets/icons/sync.svg";
import terminate from "../../assets/icons/terminate.svg";
import trash from "../../assets/icons/trash.svg";
import tree from "../../assets/icons/tree.svg";
import upload from "../../assets/icons/upload.svg";
import usage from "../../assets/icons/usage.svg";
import user from "../../assets/icons/user.svg";
import userDisable from "../../assets/icons/userDisable.svg";
import userEnable from "../../assets/icons/userEnable.svg";
import users from "../../assets/icons/users.svg";
import weeklySchedule from "../../assets/icons/weeklySchedule.svg";
import workflow from "../../assets/icons/workflow.svg";
import workflowCompleted from "../../assets/icons/workflowCompleted.svg";
import workflowFailed from "../../assets/icons/workflowFailed.svg";
import workflowPending from "../../assets/icons/workflowPending.svg";
import workflowRunning from "../../assets/icons/workflowRunning.svg";
import { IconName } from "./base";

interface AllIconsProps {
  //  Generic key with value of type string
  [index: string]: string;
}

// All icons are imported and an object containing
// all the icons is constructed
const allIcons: AllIconsProps = {
  accessKey,
  agents,
  alert,
  rocket,
  computer,
  experimentFilled,
  drive,
  dropbox,
  codeFilled,
  chooseAgent,
  chaoshub,
  analytics,
  arrowDown,
  arrowLeft,
  arrowRight,
  arrowUp,
  backward,
  bell,
  calendar,
  check,
  chevronDown,
  chevronLeft,
  chevronRight,
  chevronUp,
  clock,
  close,
  closeWrapped,
  cloud,
  clusters,
  code,
  collapseDown,
  collapseLeft,
  collapseRight,
  collapseUp,
  community,
  configure,
  copy,
  dart,
  dataSource,
  disableSchedule,
  disconnectTarget,
  document,
  documentWrapped,
  download,
  editWrapped,
  editSequence,
  enableSchedule,
  expand,
  expandDown,
  expandLeft,
  expandRight,
  expandUp,
  experiment,
  experimentBox,
  experimentError,
  experimentFailed,
  experimentNotAvailable,
  experimentOmitted,
  experimentPassed,
  experimentPending,
  experimentRunning,
  experimentSkipped,
  externalLink,
  eye,
  eyeSlash,
  feedback,
  filter,
  forward,
  fullscreen,
  hamburger,
  home,
  info,
  like,
  logout,
  logs,
  maximize,
  medal,
  menuHorizontal,
  menuVertical,
  minimize,
  paused,
  pencil,
  plus,
  project,
  recurringSchedule,
  refresh,
  reload,
  schedule,
  scheduleWorkflow,
  search,
  settings,
  share,
  showAnalytics,
  sort,
  sync,
  terminate,
  trash,
  tree,
  upload,
  usage,
  userDisable,
  userEnable,
  user,
  users,
  weeklySchedule,
  workflow,
  workflowCompleted,
  workflowFailed,
  workflowPending,
  workflowRunning,
};

// Function to get a particular icon from the object containing
// all the icons
const getIcon = (name: IconName): string => {
  return allIcons[name];
};

export { allIcons, getIcon };
