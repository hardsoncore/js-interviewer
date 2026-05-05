<p>
  <span class="accent">SemVer (Semantic Versioning)</span> is a widely accepted standard for software version numbering. It allows developers to understand how significant the changes are in a new package version just by looking at its number.
</p>

<p>A standard version consists of three numbers separated by dots: <code>MAJOR.MINOR.PATCH</code> (for example, <code>2.14.1</code>).</p>

<h4>1. Breakdown of Version Components</h4>
<h5>MAJOR version: X.0.0</h5>

<p>The MAJOR version changes when you make incompatible API changes (breaking changes).</p>

<p>What it means in practice: Old code using this package will likely break. Manual refactoring is required.</p>

<p>Example: Upgrading from Vue 2 to Vue 3 is a major update because it fundamentally changes how reactivity and component lifecycles work.</p>

<h5>MINOR version: 0.X.0</h5>

<p>The MINOR version changes when you add new functionality in a backwards-compatible manner.</p>

<p>What it means in practice: The package got new features, but all your old method calls will work as before. It is safe to update.</p>

<h5>PATCH version: 0.0.X</h5>

<p>The PATCH version changes when you make backwards-compatible bug fixes.</p>

<p>What it means in practice: Nothing new was added, they just fixed things that were working incorrectly. It is extremely safe to update.</p>

<p class="info">
  Important rule for zero versions: Versions starting with <code>0.x.x</code> (for example, <code>0.14.2</code>) are considered unstable. Any minor or even patch update in them can contain breaking changes, because the API is still under active development.
</p>

<h3>Prefixes in package.json: ^ vs ~ </h3>

<p>
  In the package.json file, a caret (<code>^</code>) or a tilde (<code>~</code>) symbol is often placed before the version number. They tell the package manager (npm/yarn) up to which version it is allowed to automatically update the package when you run the <code>npm update</code> or <code>npm install</code> command (if there is no <strong>package-lock.json</strong>).
</p>

<h3>Tilde ~ (Conservative approach)</h3>

<p><strong>Rule:</strong> Allows updates only at the PATCH level. It locks the major and minor versions.</p>

<p>Example: <code>~1.2.3</code></p>

<p><strong>Allowed updates:</strong> <code>1.2.4</code>, <code>1.2.5</code>, <code>1.2.99</code>.</p>

<p><strong>Not allowed updates:</strong> <code>1.3.0</code> (minor changed) or <code>2.0.0</code> (major changed).</p>

<p><strong>Why use it:</strong> When you want to receive only bug fixes and are absolutely not ready for new features, which could potentially bring new unexpected bugs.</p>

<h3>Caret ^ (Optimistic approach — default in npm)</h3>

<p><strong>Rule:</strong> Allows updates at the MINOR and PATCH levels. It locks only the major version.</p>

<p>Example: <code>^1.2.3</code></p>

<p><strong>Allowed updates:</strong> <code>1.2.4</code>, <code>1.3.0</code>, <code>1.9.9</code>.</p>

<p><strong>Not allowed updates:</strong> <code>2.0.0</code> (major changed).</p>

<p><strong>Why use it:</strong> It is a balance between getting fresh features/optimizations and being protected from breaking changes. It is considered the standard for most dependencies.</p>
