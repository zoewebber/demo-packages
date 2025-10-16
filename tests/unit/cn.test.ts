import { describe, it, expect } from 'vitest';
import { cn } from '@/utils/cn';

describe('cn utility', () => {
  it('should merge class names correctly', () => {
    const result = cn('px-2 py-1', 'bg-red-500', 'text-white');
    expect(result).toBe('px-2 py-1 bg-red-500 text-white');
  });

  it('should handle conditional classes', () => {
    const isActive = true;
    const result = cn('base-class', isActive && 'active-class');
    expect(result).toBe('base-class active-class');
  });

  it('should handle arrays of classes', () => {
    const result = cn(['class1', 'class2'], 'class3');
    expect(result).toBe('class1 class2 class3');
  });

  it('should handle objects with boolean values', () => {
    const result = cn({
      'class1': true,
      'class2': false,
      'class3': true,
    });
    expect(result).toBe('class1 class3');
  });

  it('should merge conflicting Tailwind classes', () => {
    const result = cn('px-2 px-4', 'py-1 py-2');
    expect(result).toBe('px-4 py-2');
  });

  it('should handle empty inputs', () => {
    const result = cn('', null, undefined, false);
    expect(result).toBe('');
  });

  it('should handle mixed input types', () => {
    const result = cn(
      'base',
      ['array1', 'array2'],
      { 'object1': true, 'object2': false },
      'string',
      true && 'conditional'
    );
    expect(result).toBe('base array1 array2 object1 string conditional');
  });
});
