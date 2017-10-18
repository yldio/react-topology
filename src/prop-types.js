import PropTypes from 'prop-types';

const p = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired
};

const s = {
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

export const Point = PropTypes.shape({
  ...p
});

export const Size = PropTypes.shape({
  ...s
});

export const Rect = PropTypes.shape({
  ...p,
  ...s
});

const statuses = ['active', 'running', 'failed', 'unknown'];

export const instanceStatuses = PropTypes.shape({
  count: PropTypes.number,
  status: PropTypes.oneOf(statuses),
  healthy: PropTypes.string
});

export const instances = PropTypes.shape({
  id: PropTypes.string.isRequired,
  status: PropTypes.oneOf(statuses),
  healthy: PropTypes.string
});

export const instancesHealthy = PropTypes.shape({
  total: PropTypes.number,
  healthy: PropTypes.number
});
