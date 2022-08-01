import ComparisonEvent from '../ComparisonEvent'

export interface ComparisonEventEmitter {
  // matches EventEmitter.on
  on<U extends keyof ComparisonEvent>(event: U, listener: ComparisonEvent[U]): this;

  // matches EventEmitter.off
  off<U extends keyof ComparisonEvent>(event: U, listener: ComparisonEvent[U]): this;
  
  // matches EventEmitter.emit
  emit<U extends keyof ComparisonEvent>(
      event: U,
      ...args: Parameters<ComparisonEvent[U]>
  ): boolean;
}

