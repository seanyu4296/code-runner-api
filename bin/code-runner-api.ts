#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { CodeRunnerApiStack } from '../lib/code-runner-api-stack';

const app = new cdk.App();
new CodeRunnerApiStack(app, 'CodeRunnerApiStack');
